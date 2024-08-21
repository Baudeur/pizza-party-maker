import { People } from "../modules/people/slice";
import { PizzaQuantity } from "../modules/pizzas/selector";
import { Pizza } from "../modules/pizzas/slice";
import { Diet } from "../types";
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
  const pizzaStatesStacked: PizzaState[] = pizzas.map((p) => ({
    diet: p.eatenBy,
    slicesLeft: slices * p.quantity,
  }));

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

function getTotalPeople(people: People) {
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

const letDietEat =
  (eat: (pizzas: PizzaState[]) => boolean) => (simu: SimulationDiet) => {
    if (simu.pizzas.reduce((acc, cur) => acc + cur.slicesLeft, 0) === 0) return;
    for (let i = 0; i < (simu.number ?? 0); i++) {
      if (eat(simu.pizzas)) {
        simu.ate++;
      }
    }
  };

const caseScenario =
  (
    behavior: (pizzas: PizzaState[]) => boolean,
    shuffle?: <T>(array: Array<T>) => void
  ) =>
  (slices: number, pizzas: PizzaQuantity[], people: People): PeopleAte => {
    const simu = createSimulation(people, pizzas, slices);

    const letDietEatWorst = letDietEat(behavior);

    const presentDiet = dietOrder.filter(
      (diet) => simu[diet] != null && simu[diet].pizzas.length > 0
    );

    while (simu.pizzas.some((ps) => ps.slicesLeft > 0)) {
      if (shuffle) shuffle(presentDiet);
      for (const diet of presentDiet) {
        letDietEatWorst(simu[diet] as SimulationDiet); //Null case deleted when presentDiet defined
      }
    }
    const peopleAte = createPeopleAte();
    for (const diet of presentDiet) {
      peopleAte[diet] = simu[diet]?.ate ?? 0;
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
  slices: number,
  pizzas: PizzaQuantity[],
  people: People
): PeopleAte {
  const scenari = [];
  for (let i = 0; i < 20; i++) {
    scenari.push(randomCaseScenario(slices, pizzas, people));
  }
  const peopleAte = createPeopleAte();
  for (const diet of dietOrder) {
    peopleAte[diet] = +(
      scenari.reduce((acc, curr) => acc + curr[diet], 0) / 20
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
