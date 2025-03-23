import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

export type PizzaWithoutID = {
  name: string;
  price: number;
  eatenBy: Diet;
  quantity: number;
  editable: boolean;
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
  pizzas: [
    {
      id: 0,
      name: "Pizza maxi gourmande",
      eatenBy: "normal",
      price: 44.5,
      quantity: 2,
      editable: false,
    },
    {
      id: 1,
      name: "Pizza maxi gourmande",
      eatenBy: "vegetarian",
      price: 44.5,
      quantity: 2,
      editable: false,
    },
    {
      id: 2,
      name: "Pizza 1",
      eatenBy: "pescoVegetarian",
      price: 44.5,
      quantity: 99,
      editable: false,
    },
    {
      id: 3,
      name: "Pizza maxi gourmande avec un nom trop long",
      eatenBy: "vegan",
      price: 999,
      quantity: 2,
      editable: false,
    },
    {
      id: 4,
      name: "",
      eatenBy: "normal",
      price: 44.54,
      quantity: 2,
      editable: false,
    },
  ],
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
        id:
          action.payload.reduce(
            (prev, curr) => (curr.id > prev ? curr.id : prev),
            -1
          ) + 1,
      };
    },
  },
});

export const pizzasReducer = pizzas.reducer;
export const { addPizza, removePizza, modifyPizza, setPizzas } = pizzas.actions;
