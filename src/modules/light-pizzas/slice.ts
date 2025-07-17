import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";
import { LightSuggestion } from "../../components/light-page/LightSuggestion";

type LightPizzasActionPayload = {
  quantity: number;
  type: Diet;
};

export type LightCalculationState = "form" | "loading" | "done";

export type LightSuggestion = Record<Diet, number>;

export type LightState = {
  suggested: LightSuggestion;
  state: LightCalculationState;
  form: {
    quantity: number;
  };
};

const initialState: LightState = {
  suggested: {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  },
  state: "form",
  form: {
    quantity: 8,
  },
};

const lightPizzas = createSlice({
  name: "light-pizzas",
  initialState,
  reducers: {
    setLightSuggestionForDiet: (
      state,
      action: PayloadAction<LightPizzasActionPayload>
    ) => {
      switch (action.payload.type) {
        case "normal":
          return {
            ...state,
            suggested: {
              ...state.suggested,
              normal: Math.max(action.payload.quantity, 0),
            },
          };
        case "vegetarian":
          return {
            ...state,
            suggested: {
              ...state.suggested,
              vegetarian: Math.max(action.payload.quantity, 0),
            },
          };
        case "vegan":
          return {
            ...state,
            suggested: {
              ...state.suggested,
              vegan: Math.max(action.payload.quantity, 0),
            },
          };
        case "pescoVegetarian":
          return {
            ...state,
            suggested: {
              ...state.suggested,
              pescoVegetarian: Math.max(action.payload.quantity, 0),
            },
          };
        default:
          return state;
      }
    },
    setLightSuggestion: (
      state,
      action: PayloadAction<Record<Diet, number>>
    ) => {
      return {
        ...state,
        suggested: action.payload,
      };
    },
    setLightState: (state, action: PayloadAction<LightCalculationState>) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    setLightFormQuantity: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        form: { ...state.form, quantity: action.payload },
      };
    },
  },
});

export const lightPizzasReducer = lightPizzas.reducer;
export const {
  setLightSuggestionForDiet,
  setLightSuggestion,
  setLightFormQuantity,
  setLightState,
} = lightPizzas.actions;
