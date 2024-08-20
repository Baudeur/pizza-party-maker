import { RootState } from "../../store";

export const pizzasSelector = (state: RootState) => state.pizzaList.pizzas;

export const pizzaByNameSelector = (state: RootState, name: string) =>
  state.pizzaList.pizzas.find((pz) => pz.name == name);
