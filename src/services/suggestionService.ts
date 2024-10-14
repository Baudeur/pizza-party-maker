import { People } from "../modules/people/slice";
import { PizzaQuantity } from "../modules/pizzas/selector";
import { Pizza } from "../modules/pizzas/slice";
import { Diet, diets } from "../types";
import {
  averageCaseScenario,
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
function getMostRestrictiveDiet(people: People): Diet {
  for (const diet of diets.slice().reverse()) {
    if (people[diet] !== 0) return diet;
  }
  throw Error("Nobody in the party");
}

// #################### SIMULATION ####################

// Find the fairness such that percent% of tries will be below.
function findXPercentWorst(
  percent: number,
  suggestedQuantity: SuggestedQuantityPerDiet,
  people: People
) {
  let worst = evaluatePeopleAte(
    simulateSuggestionQuality(suggestedQuantity, people),
    people
  );
  let continueLoop = true;
  while (continueLoop) {
    let fails = 0;
    let best = 0;
    continueLoop = false;
    for (let i = 0; i < 100; i++) {
      const gap = evaluatePeopleAte(
        simulateSuggestionQuality(suggestedQuantity, people),
        people
      );
      if (gap > worst) {
        fails += 1;
        if (gap > best) best = gap;

        //Have we exceeded the max percentage ?
        if (fails > 100 - percent) {
          worst = best;
          continueLoop = true;
          break;
        }
      }
    }
  }
  return worst;
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

//Returns the biggest different of eating among the present diets.
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

function makeInitialSuggestion(
  howManyPizza: number,
  startingDiet: Diet
): SuggestedQuantityPerDiet {
  const startingOr0 = (diet: Diet) =>
    startingDiet === diet ? howManyPizza : 0;
  return {
    normal: startingOr0("normal"),
    pescoVegetarian: startingOr0("pescoVegetarian"),
    vegetarian: startingOr0("vegetarian"),
    vegan: startingOr0("vegan"),
  };
}

/* Tries to upgrade pizza from starting diet to target diet until it breaks fairness
Takes the highest value that does not break fairness */
function fillDiet(
  startingDiet: Diet,
  targetDiet: Diet,
  suggestedQuantity: SuggestedQuantityPerDiet,
  people: People,
  fairness: number
) {
  let before = suggestedQuantity;
  let suggested = createNewSuggestedQuantity(
    suggestedQuantity,
    startingDiet,
    targetDiet
  );
  while (findXPercentWorst(99, suggested, people) < fairness) {
    before = suggested;
    suggested = createNewSuggestedQuantity(suggested, startingDiet, targetDiet);
  }
  return before;
}

//Takes one from starting diet and add one to target diet.
function createNewSuggestedQuantity(
  suggestedQuantity: SuggestedQuantityPerDiet,
  startingDiet: Diet,
  targetDiet: Diet
): SuggestedQuantityPerDiet {
  const plusOrMinus = (diet: Diet) => {
    if (startingDiet === diet) {
      return suggestedQuantity[diet] - 1;
    }
    if (targetDiet === diet) {
      return suggestedQuantity[diet] + 1;
    }
    return suggestedQuantity[diet];
  };
  return {
    normal: plusOrMinus("normal"),
    pescoVegetarian: plusOrMinus("pescoVegetarian"),
    vegetarian: plusOrMinus("vegetarian"),
    vegan: plusOrMinus("vegan"),
  };
}

//Select number pizza among pizzas, takes the same number of each pizza and select randomly the rest.
function selectPizzasMostDiversity(
  number: number,
  pizzas: Pizza[]
): SuggestedQuantityPerPizza {
  const selectedPizzas: SuggestedQuantityPerPizza = new Map();
  if (number === 0) return selectedPizzas; //No pizza to select

  const len = pizzas.length;
  const baseQuantity = Math.floor(number / len); //How many pizza of each we can have.
  let remainingQuantity = number % len; //The rest is decided randomly

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
  number: number,
  pizzas: Pizza[]
): SuggestedQuantityPerPizza {
  const selectedPizzas: SuggestedQuantityPerPizza = new Map();
  if (number === 0) return selectedPizzas;
  let minPizza = pizzas[0];
  pizzas.forEach((pz) => {
    if (pz.price < minPizza.price) minPizza = pz;
  });
  selectedPizzas.set(minPizza, number);
  return selectedPizzas;
}

// #################### API ####################

export function suggestPizzas(
  pizzas: Pizza[],
  people: People,
  minQuantity: number,
  suggestMode: SuggestMode,
  fairness: number = 1.25
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

  const howManyPizza = Math.ceil(minQuantity * totalPeople);
  const startingDiet = getMostRestrictiveDiet(people);

  //Decide how much of each diet
  let suggestedQuantity = makeInitialSuggestion(howManyPizza, startingDiet);
  const fillDietIfNecessary = (diet: Diet) => {
    if (
      people[diet] > 0 &&
      pizzasPerDiet[diet].length > 0 &&
      startingDiet !== diet
    ) {
      suggestedQuantity = fillDiet(
        startingDiet,
        diet,
        suggestedQuantity,
        people,
        fairness
      );
    }
  };
  fillDietIfNecessary("normal");
  fillDietIfNecessary("pescoVegetarian");
  fillDietIfNecessary("vegetarian");

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
