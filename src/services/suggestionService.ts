import { LightSuggestion } from "../modules/light-pizzas/slice";
import { People } from "../modules/people/slice";
import { PizzaQuantity } from "../modules/pizzas/selector";
import { Pizza } from "../modules/pizzas/slice";
import { Diet, diets } from "../types";
import {
  averageCaseScenario,
  dietOrder,
  getTotalPeople,
  PeopleAte,
} from "./calculatorService";
import { LIGHT_FAIRNESS_MIN, lightPizzas } from "./constants";
import { compareDiet, toLightSuggestion } from "./utils";

// #################### TYPES ####################

export type SuggestMode = "lowerCost" | "maxDiversity";

type SuggestedQuantityPerDiet = Record<Diet, number>;
export type SuggestedQuantityPerPizza = Map<Pizza, number>;

// #################### UTILS ####################

//Check that for every diet a pizza they can eat exists.
function isTherePizzaForEveryone(
  people: People,
  pizzasPerDiet: Record<Diet, Pizza[]>
) {
  for (const diet of diets.slice().reverse()) {
    if (pizzasPerDiet[diet].length > 0) return true;
    if (people[diet] > 0) return false;
  }
  return true;
}

//Get the most restrictive diet present at the party.

//Get a list of present diet in most restrictive to less restrictive order
function getPresentDietsInOrder(people: People, pizzas: Pizza[]): Diet[] {
  let presentDiets: Diet[] = [];
  const pizzasDiets = dietOrder.filter(
    (d) => pizzas.find((p) => p.eatenBy === d) !== undefined
  );
  const peopleDiets = dietOrder.filter((d) => people[d] !== 0);
  for (const diet of pizzasDiets) {
    // Among all pizza which diets should we keep ?
    if (peopleDiets.includes(diet)) {
      //It's useful directly. Add we keep it.
      presentDiets.push(diet);
      continue;
    }
    const toCheck = peopleDiets.filter((d) => compareDiet(diet, d) === 1); //Other diet that could need the pizza
    for (const dietCheck of toCheck) {
      if (pizzasDiets.includes(dietCheck)) break; //If there is a pizza of that upper diet, no need to use this one. Stop.
      presentDiets.push(diet); //Other wise you have a diet that doesn't have a pizza to suit its need, we keep it.
    }
  }
  if (presentDiets.length === 0) throw Error("Nobody in the party");
  return presentDiets;
}

// #################### SIMULATION ####################

function avgOfXTries(
  x: number,
  suggestedQuantity: SuggestedQuantityPerDiet,
  people: People
) {
  let sum = 0;
  for (let i = 0; i < x; i++) {
    const newEval = evaluatePeopleAte(
      simulateSuggestionQuality(suggestedQuantity, people),
      people
    );
    sum += newEval;
  }
  return sum / x;
}

function simulateSuggestionQuality(
  suggestedQuantity: SuggestedQuantityPerDiet,
  people: People
) {
  const pizzas: PizzaQuantity[] = diets.map((diet) => ({
    eatenBy: diet,
    quantity: suggestedQuantity[diet],
  }));
  return averageCaseScenario(100, 8, pizzas, people);
}

//Returns the biggest difference of eating among the present diets.
function evaluatePeopleAte(peopleAte: PeopleAte, people: People) {
  let percentageGap = 1;
  let best: Diet = "normal";
  diets.forEach((diet) => {
    if (people[diet] === 0) return;
    if (peopleAte[diet] > peopleAte[best]) {
      best = diet;
    }
    const gap = peopleAte[best] / peopleAte[diet];
    if (gap > percentageGap) {
      percentageGap = gap;
    }
  });
  return percentageGap;
}

// #################### ALGORITHM ####################

/* Loop over less diets less restrictive than starting diet and try to
increment their quantity without breaking fairness. */
function fillDiet(
  presentDiets: Diet[],
  minQuantity: number,
  howManyPizza: number,
  people: People,
  fairness: number
) {
  let given = 0;

  const lowestDiet = presentDiets[0];

  let suggestedQuantity: SuggestedQuantityPerDiet = {
    normal: 0,
    pescoVegetarian: lowestDiet === "pescoVegetarian" ? 1 : 0,
    vegetarian: lowestDiet === "vegetarian" ? 1 : 0,
    vegan: lowestDiet === "vegan" ? 1 : 0,
  };

  while (given < howManyPizza - 1) {
    const sortedDiets = presentDiets.sort((a, b) => {
      return (
        people[a] * minQuantity -
        suggestedQuantity[a] -
        (people[b] * minQuantity - suggestedQuantity[b])
      );
    });
    let whichDietIndex = sortedDiets.length - 1;

    let suggested = addOneTo(suggestedQuantity, sortedDiets[whichDietIndex]);

    while (avgOfXTries(10, suggested, people) > fairness) {
      whichDietIndex--;
      if (whichDietIndex === -1) {
        suggested = addOneTo(suggestedQuantity, lowestDiet);
        break;
      }
      suggested = addOneTo(suggestedQuantity, sortedDiets[whichDietIndex]);
    }

    suggestedQuantity = suggested;

    given++;
  }

  return suggestedQuantity;
}

function addOneTo(
  suggestedQuantity: SuggestedQuantityPerDiet,
  diet: Diet
): SuggestedQuantityPerDiet {
  const newSuggestedQuantity = { ...suggestedQuantity };
  newSuggestedQuantity[diet] += 1;
  return newSuggestedQuantity;
}

//Select number pizza among pizzas, takes the same number of each pizza and select randomly the rest.
function selectPizzasMostDiversity(
  quantity: number,
  pizzas: Pizza[]
): SuggestedQuantityPerPizza {
  const selectedPizzas: SuggestedQuantityPerPizza = new Map();
  if (quantity === 0) return selectedPizzas; //No pizza to select

  const len = pizzas.length;
  const baseQuantity = Math.floor(quantity / len); //How many pizza of each we can have.
  let remainingQuantity = quantity % len; //The rest is decided randomly

  //Necessary so all remaining don't go to the same pizza.
  let indexes = Array.from(Array(len).keys()); // [1,2,3,... len-1]
  while (remainingQuantity !== 0) {
    const rand = Math.floor(Math.random() * indexes.length);

    const quantity = selectedPizzas.get(pizzas[indexes[rand]]) ?? 0;
    selectedPizzas.set(pizzas[indexes[rand]], quantity + 1);

    indexes = indexes.slice(0, rand).concat(indexes.slice(rand + 1));
    remainingQuantity -= 1;
  }
  if (baseQuantity === 0) return selectedPizzas;
  for (const pizza of pizzas) {
    const quantity = selectedPizzas.get(pizza) ?? 0;
    selectedPizzas.set(pizza, quantity + baseQuantity);
  }
  return selectedPizzas;
}

function selectPizzasCheapest(
  quantity: number,
  pizzas: Pizza[]
): SuggestedQuantityPerPizza {
  const selectedPizzas: SuggestedQuantityPerPizza = new Map();
  if (quantity === 0) return selectedPizzas;
  let minPizza = pizzas[0];
  pizzas.forEach((pz) => {
    if (pz.price < minPizza.price) minPizza = pz;
  });
  selectedPizzas.set(minPizza, quantity);
  return selectedPizzas;
}

// #################### API ####################

export function suggestPizzas(
  pizzas: Pizza[],
  people: People,
  minQuantity: number,
  suggestMode: SuggestMode,
  fairness: number = 125
): SuggestedQuantityPerPizza {
  const totalPeople = getTotalPeople(people);
  if (totalPeople === 0 || minQuantity === 0) return new Map();

  const pizzasPerDiet: Record<Diet, Pizza[]> = {
    normal: pizzas.filter((pz) => pz.eatenBy === "normal"),
    pescoVegetarian: pizzas.filter((pz) => pz.eatenBy === "pescoVegetarian"),
    vegetarian: pizzas.filter((pz) => pz.eatenBy === "vegetarian"),
    vegan: pizzas.filter((pz) => pz.eatenBy === "vegan"),
  };
  if (!isTherePizzaForEveryone(people, pizzasPerDiet))
    throw Error("Some people can't eat !");

  //How many pizzas should be ordered
  const howManyPizza = Math.ceil(minQuantity * totalPeople);

  //What kind of diet is present at the party
  const presentDiets = getPresentDietsInOrder(people, pizzas);

  let suggestedQuantity: SuggestedQuantityPerDiet = {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  };

  //If only one diet present give it all pizzas
  if (presentDiets.length === 1) {
    suggestedQuantity[presentDiets[0]] = howManyPizza;
  } else {
    suggestedQuantity = fillDiet(
      presentDiets,
      minQuantity,
      howManyPizza,
      people,
      fairness / 100
    );
  }

  //Select pizzas accordingly
  const suggestedQuantityPerPizza: SuggestedQuantityPerPizza = new Map();
  let pizzaSelector = selectPizzasMostDiversity;
  if (suggestMode === "lowerCost") pizzaSelector = selectPizzasCheapest;
  diets.forEach((diet) => {
    pizzaSelector(suggestedQuantity[diet], pizzasPerDiet[diet]).forEach(
      (value, key) => {
        suggestedQuantityPerPizza.set(key, value);
      }
    );
  });
  return suggestedQuantityPerPizza;
}

/* 
  Increase fairness index (hence making the order less fair) until the suggestion of {diet} is increased by one.
  While doing so it tries to keep the {diet} that have more people than pizza at the same value or more.
*/

export function suggestMore(
  suggestedQuantity: LightSuggestion,
  people: People,
  diet: Diet,
  fairness: number,
  minQuantity: number
) {
  const check = (suggestion: LightSuggestion) => {
    return (
      diets
        .filter((d) => people[d] * minQuantity > suggestedQuantity[d])
        .every((d) => suggestion[d] >= suggestedQuantity[d]) &&
      suggestion[diet] > suggestedQuantity[diet]
    );
  };
  let newSuggestion = suggestedQuantity;
  let newFairness = fairness;
  while (!check(newSuggestion)) {
    newFairness += 10;
    const result = suggestPizzas(
      lightPizzas,
      people,
      minQuantity,
      "lowerCost",
      newFairness
    );
    newSuggestion = toLightSuggestion(result);
  }
  return { suggestion: newSuggestion, fairness: newFairness };
}

/* 
  Reduces fairness index (hence making the order more fair) until the suggestion changes
*/

export function suggestLess(
  suggestedQuantity: LightSuggestion,
  people: People,
  fairness: number,
  minQuantity: number
) {
  let newSuggestion = suggestedQuantity;
  let newFairness = fairness;
  while (
    diets.every((d) => suggestedQuantity[d] === newSuggestion[d]) &&
    newFairness > LIGHT_FAIRNESS_MIN
  ) {
    newFairness -= 10;
    const result = suggestPizzas(
      lightPizzas,
      people,
      minQuantity,
      "lowerCost",
      newFairness
    );
    newSuggestion = toLightSuggestion(result);
  }
  return { suggestion: newSuggestion, fairness: newFairness };
}
