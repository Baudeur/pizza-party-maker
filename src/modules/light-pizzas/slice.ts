import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet } from "../../types";

type LightPizzasActionPayload = {
  quantity: number;
  type: Diet;
};

export type LightFairness = {
  okay: number;
  bad: number;
};

export type LightCalculationState = "form" | "loading" | "done";

export type LigthSuggestion = Record<Diet, number>;

export type LightState = {
  suggestion: LigthSuggestion;
  state: LightCalculationState;
  form: {
    // quantity: number;
    fairness: LightFairness;
  };
};

const initialState: LightState = {
  suggestion: {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  },
  state: "form",
  form: {
    // quantity: 8,
    fairness: {
      okay: 125,
      bad: 150,
    },
  },
};

const ligthPizzas = createSlice({
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
            suggestion: {
              ...state.suggestion,
              normal: Math.max(action.payload.quantity, 0),
            },
          };
        case "vegetarian":
          return {
            ...state,
            suggestion: {
              ...state.suggestion,
              vegetarian: Math.max(action.payload.quantity, 0),
            },
          };
        case "vegan":
          return {
            ...state,
            suggestion: {
              ...state.suggestion,
              vegan: Math.max(action.payload.quantity, 0),
            },
          };
        case "pescoVegetarian":
          return {
            ...state,
            suggestion: {
              ...state.suggestion,
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
        suggestion: action.payload,
      };
    },
    setLightState: (state, action: PayloadAction<LightCalculationState>) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    // setLightFormQuantity: (state, action: PayloadAction<number>) => {
    //   return {
    //     ...state,
    //     form: { ...state.form, quantity: action.payload },
    //   };
    // },
    setLightFormFairness: (state, action: PayloadAction<LightFairness>) => {
      return {
        ...state,
        form: { ...state.form, fairness: action.payload },
      };
    },
  },
});

export const lightPizzasReducer = ligthPizzas.reducer;
export const {
  setLightSuggestionForDiet,
  setLightSuggestion,
  setLightFormFairness,
  // setLightFormQuantity,
  setLightState,
} = ligthPizzas.actions;
