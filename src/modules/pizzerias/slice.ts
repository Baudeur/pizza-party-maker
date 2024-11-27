import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../pizzas/slice";
import { v4 as uuidv4 } from "uuid";

export type PizzeriaWithoutID = {
  name: string;
  pizzas: Pizza[];
};

export type Pizzeria = {
  id: string;
  name: string;
  pizzas: Pizza[];
};

export type StoredPizzerias = {
  version: number;
  pizzerias: Pizzeria[];
};

type PizzeriasState = {
  loaded: string | undefined;
  pizzerias: Pizzeria[];
};

const initialState: PizzeriasState = {
  loaded: undefined,
  pizzerias: [],
};

const pizzerias = createSlice({
  name: "pizzerias",
  initialState,
  reducers: {
    addPizzeria: (state, action: PayloadAction<PizzeriaWithoutID>) => {
      const newPizzeria = {
        id: uuidv4(),
        name: action.payload.name,
        pizzas: action.payload.pizzas.map((pizza) => ({
          ...pizza,
          quantity: 0,
        })),
      };
      return {
        ...state,
        pizzerias: storeState([...state.pizzerias, newPizzeria]),
        loaded: newPizzeria.id,
      };
    },
    removePizzeria: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        pizzerias: storeState(
          state.pizzerias.filter((pizzerias) => pizzerias.id !== action.payload)
        ),
        loaded: action.payload === state.loaded ? undefined : state.loaded,
      };
    },
    modifyPizzeria: (state, action: PayloadAction<Pizzeria>) => {
      const pizzeriaIndex = state.pizzerias.findIndex(
        (pizzeria) => pizzeria.id === action.payload.id
      );
      const modifiedPizzeria: Pizzeria = {
        ...action.payload,
        pizzas: action.payload.pizzas.map((pizza) => ({
          ...pizza,
          quantity: 0,
        })),
      };
      return {
        ...state,
        pizzerias: storeState([
          ...state.pizzerias.slice(0, pizzeriaIndex),
          modifiedPizzeria,
          ...state.pizzerias.slice(pizzeriaIndex + 1),
        ]),
        loaded: action.payload.id,
      };
    },
    setPizzerias: (state, action: PayloadAction<Pizzeria[]>) => {
      return {
        ...state,
        loaded: undefined,
        pizzerias: action.payload,
      };
    },
    loadPizzeria: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    unloadPizzeria: (state) => {
      return {
        ...state,
        loaded: undefined,
      };
    },
  },
});

function storeState(state: Pizzeria[]) {
  const toStore: StoredPizzerias = {
    version: 1,
    pizzerias: state,
  };
  localStorage.setItem("pizzerias", JSON.stringify(toStore));
  return state;
}

export const pizzeriasReducer = pizzerias.reducer;
export const {
  addPizzeria,
  removePizzeria,
  modifyPizzeria,
  setPizzerias,
  loadPizzeria,
  unloadPizzeria,
} = pizzerias.actions;
