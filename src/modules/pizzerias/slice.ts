import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { Pizza, setPizzas } from "../pizzas/slice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store";

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
  loaded: string | undefined;
};

type PizzeriasState = {
  loaded: string | undefined;
  pizzeriaState: "nothing" | "loaded" | "editing";
  pizzerias: Pizzeria[];
};

const initialState: PizzeriasState = {
  loaded: undefined,
  pizzeriaState: "nothing",
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
          editable: false,
        })),
      };
      return storeState({
        ...state,
        pizzerias: [...state.pizzerias, newPizzeria],
        loaded: newPizzeria.id,
        pizzeriaState: "loaded",
      });
    },
    removePizzeria: (state, action: PayloadAction<string>) => {
      return storeState({
        ...state,
        pizzerias: state.pizzerias.filter(
          (pizzerias) => pizzerias.id !== action.payload
        ),
        loaded: action.payload === state.loaded ? undefined : state.loaded,
        pizzeriaState:
          action.payload === state.loaded ? "nothing" : state.pizzeriaState,
      });
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
          editable: false,
        })),
      };
      return storeState({
        ...state,
        pizzerias: [
          ...state.pizzerias.slice(0, pizzeriaIndex),
          modifiedPizzeria,
          ...state.pizzerias.slice(pizzeriaIndex + 1),
        ],
        loaded: action.payload.id,
        pizzeriaState: "loaded",
      });
    },
    setPizzerias: (state, action: PayloadAction<Pizzeria[]>) => {
      return {
        ...state,
        loaded: undefined,
        pizzerias: action.payload,
        pizzeriaState: "nothing",
      };
    },
    loadPizzeria: (state, action: PayloadAction<string>) => {
      return storeState({
        ...state,
        loaded: action.payload,
        pizzeriaState: "loaded",
      });
    },
    unloadPizzeria: (state) => {
      return storeState({
        ...state,
        loaded: undefined,
        pizzeriaState: "nothing",
      });
    },
    editPizzeria: (state) => {
      return {
        ...state,
        pizzeriaState: "editing",
      };
    },
  },
});

export function addPizzeria(
  pizzeria: PizzeriaWithoutID
): ThunkAction<void, void, unknown, UnknownAction> {
  return (dispatch) => {
    dispatch(pizzerias.actions.addPizzeria(pizzeria));
    dispatch(
      setPizzas(pizzeria.pizzas.map((p) => ({ ...p, editable: false })))
    );
  };
}

export function removePizzeria(
  id: string
): ThunkAction<void, RootState, unknown, UnknownAction> {
  return (dispatch, getState) => {
    const loaded = getState().pizzerias.loaded;
    dispatch(pizzerias.actions.removePizzeria(id));
    if (loaded === id) {
      dispatch(setPizzas([]));
    }
  };
}

export function modifyPizzeria(
  pizzeria: Pizzeria
): ThunkAction<void, RootState, unknown, UnknownAction> {
  return (dispatch) => {
    dispatch(pizzerias.actions.modifyPizzeria(pizzeria));
    dispatch(
      setPizzas(pizzeria.pizzas.map((p) => ({ ...p, editable: false })))
    );
  };
}

export function loadPizzeria(
  id: string
): ThunkAction<void, RootState, unknown, UnknownAction> {
  return (dispatch, getState) => {
    const pizzeriaToLoad = getState().pizzerias.pizzerias.find(
      (pizzeria) => pizzeria.id === id
    );
    dispatch(pizzerias.actions.loadPizzeria(id));
    dispatch(setPizzas(pizzeriaToLoad?.pizzas ?? []));
  };
}

export function unloadPizzeria(): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> {
  return (dispatch) => {
    dispatch(pizzerias.actions.unloadPizzeria());
    dispatch(setPizzas([]));
  };
}

function storeState(state: PizzeriasState) {
  const toStore: StoredPizzerias = {
    version: 2,
    pizzerias: state.pizzerias,
    loaded: state.loaded,
  };
  localStorage.setItem("pizzerias", JSON.stringify(toStore));
  return state;
}

export const pizzeriasReducer = pizzerias.reducer;
export const { setPizzerias, editPizzeria } = pizzerias.actions;
