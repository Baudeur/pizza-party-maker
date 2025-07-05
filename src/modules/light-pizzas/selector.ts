import { RootState } from "../../store";
import { Diet } from "../../types";

export const lightSuggestionSelector = (state: RootState) =>
  state.lightPizzas.suggestion;

export const lightSuggestionDietSelector = (name: Diet) => (state: RootState) =>
  state.lightPizzas.suggestion[name];

export const lightStateSelector = (state: RootState) => state.lightPizzas.state;

export const lightFairnessSelector = (state: RootState) =>
  state.lightPizzas.form.fairness;
