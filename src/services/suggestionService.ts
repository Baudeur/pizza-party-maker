import { LightSuggestion } from "../modules/light-pizzas/slice";
import { People } from "../modules/people/slice";
import { Diet, diets } from "../types";
import {
  averageCaseScenario,
  dietOrder,
  getTotalPeople,
  PeopleAte,
} from "./calculatorService";
import { LIGHT_FAIRNESS_MIN } from "./constants";

// #################### TYPES ####################

// #################### SIMULATION ####################

function avgOfXTries(
  x: number,
  suggestedQuantity: LightSuggestion,
  people: People,
) {
  let sum = 0;
  for (let i = 0; i < x; i++) {
    const newEval = evaluatePeopleAte(
      simulateSuggestionQuality(suggestedQuantity, people),
      people,
    );
    sum += newEval;
  }
  return sum / x;
}

function simulateSuggestionQuality(
  suggestedQuantity: LightSuggestion,
  people: People,
) {
  return averageCaseScenario(100, 8, suggestedQuantity, people);
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
  fairness: number,
) {
  let given = 0;

  const lowestDiet = presentDiets[0];

  let suggestedQuantity: LightSuggestion = {
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
  suggestedQuantity: LightSuggestion,
  diet: Diet,
): LightSuggestion {
  const newSuggestedQuantity = { ...suggestedQuantity };
  newSuggestedQuantity[diet] += 1;
  return newSuggestedQuantity;
}

// #################### API ####################

export function suggestPizzas(
  people: People,
  minQuantity: number,
  fairness: number = LIGHT_FAIRNESS_MIN,
): LightSuggestion {
  const totalPeople = getTotalPeople(people);
  if (totalPeople === 0 || minQuantity === 0) Error("Nobody here");

  //How many pizzas should be ordered
  const howManyPizza = Math.ceil(minQuantity * totalPeople);

  //What type of people diets are at the party.
  const peopleDiets = dietOrder.filter((d) => people[d] !== 0);

  let suggestedQuantity: LightSuggestion = {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  };

  //If only one diet present give it all pizzas
  if (peopleDiets.length === 1) {
    suggestedQuantity[peopleDiets[0]] = howManyPizza;
  } else {
    suggestedQuantity = fillDiet(
      peopleDiets,
      minQuantity,
      howManyPizza,
      people,
      fairness / 100,
    );
  }

  return suggestedQuantity;
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
  minQuantity: number,
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
    newSuggestion = suggestPizzas(people, minQuantity, newFairness);
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
  minQuantity: number,
) {
  let newSuggestion = suggestedQuantity;
  let newFairness = fairness;
  while (
    diets.every((d) => suggestedQuantity[d] === newSuggestion[d]) &&
    newFairness > LIGHT_FAIRNESS_MIN
  ) {
    newFairness -= 10;
    newSuggestion = suggestPizzas(people, minQuantity, newFairness);
  }
  return { suggestion: newSuggestion, fairness: newFairness };
}
