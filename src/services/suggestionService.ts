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
function getPresentDietsInOrder(people: People): Diet[] {
  let presentDiets: Diet[] = [];
  for (const diet of dietOrder) {
    if (people[diet] !== 0) presentDiets.push(diet);
  }
  if (presentDiets.length === 0) throw Error("Nobody in the party");
  return presentDiets;
}

// #################### SIMULATION ####################

// Find the fairness such that percent% of tries will be below. Let's call the percent X.
/* This works this way.
  -It takes a first evaluation as a reference. Called 'worstGapGlobal'.
  -It tries to run a 100 other evaluation. Counting every time we find a worse case than 'worstGapGlobal'
  -If we find a worse value than 'worstGapGlobal' more than (100 - X) times.
    -'worstGapGlobal' take the value of the worst value of the 100 check loop. Called worstGapLoop.
    -It starts the 100 evaluation over again.
  -Else it stops and returns worst.
*/

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

  while (given < howManyPizza) {
    const sortedDiets = presentDiets.sort((a, b) => {
      return (
        people[a] - suggestedQuantity[a] - (people[b] - suggestedQuantity[b])
      );
    });
    let whichDietIndex = sortedDiets.length - 1;

    let suggested = addOneTo(suggestedQuantity, sortedDiets[whichDietIndex]);

    while (
      evaluatePeopleAte(simulateSuggestionQuality(suggested, people), people) >
      fairness
    ) {
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
  const presentDiets = getPresentDietsInOrder(people);

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
