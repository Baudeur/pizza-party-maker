import { FlagState } from "../components/utils/PizzaFlag";
import { People } from "../modules/people/slice";
import { PizzaQuantity } from "../modules/pizzas/selector";
import { Pizza } from "../modules/pizzas/slice";
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

const dietOrder: Diet[] = ["vegan", "vegetarian", "pescoVegetarian", "normal"];

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
  pizzas: PizzaQuantity[],
  slices: number
): Simulation {
  //Group the pizza per diet adding the quantity.
  const pizzaStatesStacked: PizzaState[] = pizzas.map((p) => ({
    diet: p.eatenBy,
    slicesLeft: slices * p.quantity,
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
        dishDiet
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
      Math.random() * pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0)
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
  pizzas: PizzaState[]
): PizzaState[] {
  if (people.normal > 0) return pizzas;
  if (people.pescoVegetarian > 0)
    return pizzas.filter((ps) => canEat("pescoVegetarian", ps.diet));
  if (people.vegetarian > 0)
    return pizzas.filter((ps) => canEat("vegetarian", ps.diet));
  if (people.vegan > 0) return pizzas.filter((ps) => canEat("vegan", ps.diet));
  return [];
}

const pickPizzasInOrder = (order: Diet[]) => (pizzas: PizzaState[]) => {
  //A list of pizza list grouped by diet.
  const pizzaDiets = order.map((diet) =>
    pizzas.filter((ps) => ps.diet === diet)
  );
  for (const pizzaDiet of pizzaDiets) {
    if (pickRandomSlice(pizzaDiet)) return true;
  }
  return false;
};

const pickPizzaRandom = () => (pizzas: PizzaState[]) => {
  return pickRandomSlice(pizzas);
};

const eatOneRound =
  (eat: (pizzas: PizzaState[]) => boolean) =>
  (simulation: Simulation, peopleList: Diet[]) => {
    for (const diet of peopleList) {
      const simuDiet = simulation[diet] as SimulationDiet;
      if (simuDiet.pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0) === 0)
        continue;

      if (eat(simuDiet.pizzas)) {
        simuDiet.ate++;
      }
    }
  };

const caseScenario =
  (
    behavior: (pizzas: PizzaState[]) => boolean,
    shuffle?: <T>(array: Array<T>) => void
  ) =>
  (slices: number, pizzas: PizzaQuantity[], people: People): PeopleAte => {
    const simulation = createSimulation(people, pizzas, slices);

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

export const worstCaseScenario = caseScenario(pickPizzasInOrder(dietOrder));

export const bestCaseScenario = caseScenario(
  pickPizzasInOrder(dietOrder.slice().reverse())
);

export const randomCaseScenario = caseScenario(pickPizzaRandom(), shuffleArray);

export function averageCaseScenario(
  iterations: number,
  slices: number,
  pizzas: PizzaQuantity[],
  people: People
): PeopleAte {
  const scenari = [];
  const simulationNumber = iterations;
  for (let i = 0; i < simulationNumber; i++) {
    scenari.push(randomCaseScenario(slices, pizzas, people));
  }
  const peopleAte = createPeopleAte();
  for (const diet of dietOrder) {
    peopleAte[diet] = +(
      scenari.reduce((acc, curr) => acc + curr[diet], 0) / simulationNumber
    ).toFixed(1);
  }
  return peopleAte;
}

export function pizzaPricePerPerson(people: People, pizzas: Pizza[]) {
  const totalPeople = getTotalPeople(people);
  if (totalPeople === 0) return 0;
  return +(
    pizzas.reduce((acc, pi) => acc + pi.price * pi.quantity, 0) / totalPeople
  ).toFixed(2);
}

export function pizzaPriceTotal(pizzas: Pizza[]) {
  return +pizzas
    .reduce((acc, pi) => acc + pi.price * pi.quantity, 0)
    .toFixed(2);
}

export function pizzaSlicesPerPerson(
  people: People,
  pizzas: Pizza[],
  slices: number
) {
  const totalPeople = getTotalPeople(people);
  if (totalPeople === 0) return 0;
  return +(
    (pizzas.reduce((acc, p) => acc + p.quantity, 0) * slices) /
    totalPeople
  ).toFixed(1);
}

export function stateOfDiet(
  diet: Diet,
  peopleAte: PeopleAte,
  people: People,
  okayThreshold: number,
  badThreshold: number
): FlagState {
  if (people[diet] === 0) return "N/A";
  const maxAte = Math.max(
    Math.max(peopleAte.normal, peopleAte.pescoVegetarian),
    Math.max(peopleAte.vegan, peopleAte.vegetarian)
  );
  if (peopleAte[diet] === 0) return "cantEat";
  if (peopleAte[diet] === maxAte) return "perfect";
  if ((peopleAte[diet] * badThreshold) / 100 < maxAte) return "bad";
  if ((peopleAte[diet] * okayThreshold) / 100 < maxAte) return "okay";
  if (peopleAte[diet] < maxAte) return "good";
  return "N/A";
}
