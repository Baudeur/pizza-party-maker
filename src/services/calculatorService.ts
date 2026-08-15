import { LightSuggestion } from "../modules/light-pizzas/slice";
import { People } from "../modules/people/slice";
import { Diet, diets } from "../types";
import { shuffleArray } from "./utils";

// ####################### TYPES #######################

type PizzaState = {
  diet: Diet;
  slicesLeft: number;
};

type SimulationDiet = { number: number; ate: number; pizzas: PizzaState[] };
type Simulation = { pizzas: PizzaState[] } & Record<
  Diet,
  SimulationDiet | null
>;

export type PeopleAte = Record<Diet, number>;

// ####################### CONSTANTS #######################

//Do not use diets constant, it would be a false semantic link
export const dietOrder: Diet[] = [
  "vegan",
  "vegetarian",
  "pescoVegetarian",
  "normal",
];

// ####################### UTILITY FUNCTION #######################

function createPeopleAte(): PeopleAte {
  return {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  };
}

function createSimulation(
  people: People,
  suggestion: LightSuggestion,
  slices: number,
): Simulation {
  //Group the pizza per diet adding the quantity.
  const pizzaStatesStacked: PizzaState[] = diets.map((diet) => ({
    diet: diet,
    slicesLeft: slices * suggestion[diet],
  }));

  //Remove the pizza that can't be eaten.
  const pizzaStates = removeUneatablePizza(people, pizzaStatesStacked);

  function createSimuPart(diet: Diet) {
    return people[diet] === 0
      ? null
      : {
          number: people[diet],
          ate: 0,
          pizzas: pizzaStates.filter((ps) => canEat(diet, ps.diet)),
        };
  }

  return {
    pizzas: pizzaStates,
    normal: createSimuPart("normal"),
    pescoVegetarian: createSimuPart("pescoVegetarian"),
    vegetarian: createSimuPart("vegetarian"),
    vegan: createSimuPart("vegan"),
  };
}

function canEat(personDiet: Diet, dishDiet: Diet) {
  switch (personDiet) {
    case "normal":
      return ["normal", "pescoVegetarian", "vegetarian", "vegan"].includes(
        dishDiet,
      );
    case "pescoVegetarian":
      return ["pescoVegetarian", "vegetarian", "vegan"].includes(dishDiet);
    case "vegetarian":
      return ["vegetarian", "vegan"].includes(dishDiet);
    case "vegan":
      return ["vegan"].includes(dishDiet);
  }
}

export function getTotalPeople(people: People) {
  let totalPeople = 0;
  for (const diet of dietOrder) {
    totalPeople += people[diet];
  }
  return totalPeople;
}

function averagePeopleAte(people: People, peopleAte: PeopleAte) {
  for (const diet of dietOrder) {
    if (people[diet] === 0) continue;
    peopleAte[diet] = +(peopleAte[diet] / people[diet]).toFixed(1);
  }
  return peopleAte;
}

// ####################### CALCULATION FUNCTION #######################

function pickRandomSlice(pizzas: PizzaState[]): boolean {
  if (
    pizzas.length === 0 ||
    pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0) === 0
  ) {
    return false;
  }
  if (pizzas.length === 1) {
    pizzas[0].slicesLeft--;
    return true;
  }
  let rand =
    1 +
    Math.floor(
      Math.random() * pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0),
    );
  let pizzaIndex = 0;
  rand -= pizzas[pizzaIndex].slicesLeft;
  while (rand > 0) {
    pizzaIndex++;
    rand -= pizzas[pizzaIndex].slicesLeft;
  }
  pizzas[pizzaIndex].slicesLeft--;
  return true;
}

function removeUneatablePizza(
  people: People,
  pizzas: PizzaState[],
): PizzaState[] {
  if (people.normal > 0) return pizzas;
  if (people.pescoVegetarian > 0)
    return pizzas.filter((ps) => canEat("pescoVegetarian", ps.diet));
  if (people.vegetarian > 0)
    return pizzas.filter((ps) => canEat("vegetarian", ps.diet));
  if (people.vegan > 0) return pizzas.filter((ps) => canEat("vegan", ps.diet));
  return [];
}

const pickPizzaRandom = () => (pizzas: PizzaState[]) => {
  return pickRandomSlice(pizzas);
};

const eatOneRound =
  (eat: (pizzas: PizzaState[]) => boolean) =>
  (simulation: Simulation, peopleList: Diet[]) => {
    for (const diet of peopleList) {
      const simuDiet = simulation[diet] as SimulationDiet;
      if (simuDiet.pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0) === 0)
        //No pizza to eat left
        continue;

      if (eat(simuDiet.pizzas)) {
        simuDiet.ate++;
      }
    }
  };

const caseScenario =
  (
    behavior: (pizzas: PizzaState[]) => boolean,
    shuffle?: <T>(array: Array<T>) => void,
  ) =>
  (slices: number, suggestion: LightSuggestion, people: People): PeopleAte => {
    const simulation = createSimulation(people, suggestion, slices);

    const eatOneRoundBehavior = eatOneRound(behavior);

    const peopleList: Diet[] = diets
      .map((diet) => {
        const simuDiet = simulation[diet];
        if (simuDiet === null) return [];
        if (simuDiet.pizzas.length === 0) return [];
        return Array(simuDiet.number).fill(diet);
      })
      .flat();

    while (simulation.pizzas.some((ps) => ps.slicesLeft > 0)) {
      if (shuffle) shuffle(peopleList);
      eatOneRoundBehavior(simulation, peopleList);
    }
    const peopleAte = createPeopleAte();
    for (const diet of diets) {
      peopleAte[diet] = simulation[diet]?.ate ?? 0;
    }
    return averagePeopleAte(people, peopleAte);
  };

// ####################### API #######################

const randomCaseScenario = caseScenario(pickPizzaRandom(), shuffleArray);

export function averageCaseScenario(
  iterations: number,
  slices: number,
  suggestion: LightSuggestion,
  people: People,
): PeopleAte {
  const scenari = [];
  const simulationNumber = iterations;
  for (let i = 0; i < simulationNumber; i++) {
    scenari.push(randomCaseScenario(slices, suggestion, people));
  }
  const peopleAte = createPeopleAte();
  for (const diet of dietOrder) {
    peopleAte[diet] = +(
      scenari.reduce((acc, curr) => acc + curr[diet], 0) / simulationNumber
    ).toFixed(1);
  }
  return peopleAte;
}
