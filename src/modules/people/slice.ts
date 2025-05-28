import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

export type People = Record<Diet, number>;

type PeopleActionPayload = {
  quantity: number;
  type: Diet;
};

export type StoredPeople = {
  version: number;
} & Record<Diet, number>;

const initialState: People = {
  normal: 0,
  vegetarian: 0,
  vegan: 0,
  pescoVegetarian: 0,
};

const people = createSlice({
  name: "people",
  initialState,
  reducers: {
    setNumber: (state, action: PayloadAction<PeopleActionPayload>) => {
      switch (action.payload.type) {
        case "normal":
          return storeState({
            ...state,
            normal: Math.max(action.payload.quantity, 0),
          });
        case "vegetarian":
          return storeState({
            ...state,
            vegetarian: Math.max(action.payload.quantity, 0),
          });
        case "vegan":
          return storeState({
            ...state,
            vegan: Math.max(action.payload.quantity, 0),
          });
        case "pescoVegetarian":
          return storeState({
            ...state,
            pescoVegetarian: Math.max(action.payload.quantity, 0),
          });
        default:
          return state;
      }
    },
  },
});

function storeState(state: People) {
  const toStore: StoredPeople = {
    version: 1,
    normal: state.normal,
    pescoVegetarian: state.pescoVegetarian,
    vegetarian: state.vegetarian,
    vegan: state.vegan,
  };
  localStorage.setItem("people", JSON.stringify(toStore));
  return state;
}

export const peopleReducer = people.reducer;
export const { setNumber } = people.actions;
