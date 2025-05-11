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
/* This works this way.
  -It takes a first evaluation as a reference. Called worst.
  -It tries to run a 100 other evaluation.
  -If we find a worst value than worst 100 minus percent time.
    -worst take the value of the worst value of the 100 check loop. Called greatest.
    -It starts the 100 evaluation over again.
  -Else it stops and returns worst.

*/
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
    let greatest = 0;
    continueLoop = false;
    for (let i = 0; i < 100; i++) {
      const gap = evaluatePeopleAte(
        simulateSuggestionQuality(suggestedQuantity, people),
        people
      );
      if (gap > worst) {
        if (gap > greatest) greatest = gap;
        fails += 1;
        //Have we exceeded the max percentage ?
        if (fails > 100 - percent) {
          worst = greatest;
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
  const initialSuggestion = {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  };
  initialSuggestion[startingDiet] = howManyPizza;
  return initialSuggestion;
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
  const newSuggestedQuantity = { ...suggestedQuantity };
  newSuggestedQuantity[targetDiet] += 1;
  newSuggestedQuantity[startingDiet] -= 1;
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
        fairness / 100
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
