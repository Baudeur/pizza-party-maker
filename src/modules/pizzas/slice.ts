import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

export type PizzaWithoutID = {
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
  editable: boolean;
};

export type StoredPizza = {
  id: number;
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
};

export type StoredPizzas = {
  version: number;
  pizzas: StoredPizza[];
};

export type Pizza = {
  id: number;
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
  editable: boolean;
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
        editable: action.payload.editable,
      };
      return {
        ...state,
        id: state.id + 1,
        pizzas: storeState([...state.pizzas, newPizza]),
      };
    },
    removePizza: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        pizzas: storeState(
          state.pizzas.filter((pizza) => pizza.id !== action.payload)
        ),
      };
    },
    modifyPizza: (state, action: PayloadAction<Pizza>) => {
      const pizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === action.payload.id
      );
      return {
        ...state,
        pizzas: storeState([
          ...state.pizzas.slice(0, pizzaIndex),
          action.payload,
          ...state.pizzas.slice(pizzaIndex + 1),
        ]),
      };
    },
    setPizzas: (state, action: PayloadAction<Pizza[]>) => {
      return {
        ...state,
        pizzas: storeState(action.payload),
        id:
          action.payload.reduce(
            (prev, curr) => (curr.id > prev ? curr.id : prev),
            -1
          ) + 1,
      };
    },
  },
});

function storeState(state: Pizza[]) {
  const toStore: StoredPizzas = {
    version: 1,
    pizzas: state,
  };
  localStorage.setItem("pizzas", JSON.stringify(toStore));
  return state;
}

export const pizzasReducer = pizzas.reducer;
export const { addPizza, removePizza, modifyPizza, setPizzas } = pizzas.actions;
