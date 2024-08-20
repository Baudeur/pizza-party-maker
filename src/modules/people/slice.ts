import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

export type People = Record<Diet, number>;

type PeopleActionPayload = {
  quantity: number;
  type: Diet;
};

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
          return { ...state, normal: Math.max(action.payload.quantity, 0) };
        case "vegetarian":
          return { ...state, vegetarian: Math.max(action.payload.quantity, 0) };
        case "vegan":
          return { ...state, vegan: Math.max(action.payload.quantity, 0) };
        case "pescoVegetarian":
          return {
            ...state,
            pescoVegetarian: Math.max(action.payload.quantity, 0),
          };
        default:
          return state;
      }
    },
  },
});

export const peopleReducer = people.reducer;
export const { setNumber } = people.actions;
