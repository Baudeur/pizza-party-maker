import { RootState } from "../../store";
import { Diet, diets } from "../../types";

export const pizzasSelector = (state: RootState) => state.pizzaList.pizzas;

export type PizzaQuantity = {
  eatenBy: Diet;
  quantity: number;
};

export const pizzaQuantitySelector = (state: RootState): PizzaQuantity[] =>
  diets.map((diet) => ({
    eatenBy: diet,
    quantity: state.pizzaList.pizzas.reduce(
      (acc, curr) => (curr.eatenBy === diet ? acc + curr.quantity : acc),
      0
    ),
  }));
