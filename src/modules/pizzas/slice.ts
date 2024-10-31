import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

export type PizzaWithoutID = {
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
};

export type Pizza = {
  id: number;
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
};

type PizzaState = {
  pizzas: Pizza[];
  id: number;
};

const initialState: PizzaState = {
  pizzas: [],
  id: 0,
};

const pizzas = createSlice({
  name: "pizzaList",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<PizzaWithoutID>) => {
      const newPizza: Pizza = {
        id: state.id,
        name: action.payload.name,
        price: action.payload.price,
        eatenBy: action.payload.eatenBy,
        quantity: action.payload.quantity,
      };
      return { id: state.id + 1, pizzas: [...state.pizzas, newPizza] };
    },
    removePizza: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        pizzas: state.pizzas.filter((pizza) => pizza.id !== action.payload),
      };
    },
    modifyPizza: (state, action: PayloadAction<Pizza>) => {
      const pizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === action.payload.id
      );
      return {
        ...state,
        pizzas: [
          ...state.pizzas.slice(0, pizzaIndex),
          action.payload,
          ...state.pizzas.slice(pizzaIndex + 1),
        ],
      };
    },
    setPizzas: (state, action: PayloadAction<Pizza[]>) => {
      return {
        ...state,
        pizzas: action.payload,
      };
    },
  },
});

export const pizzasReducer = pizzas.reducer;
export const { addPizza, removePizza, modifyPizza, setPizzas } = pizzas.actions;
