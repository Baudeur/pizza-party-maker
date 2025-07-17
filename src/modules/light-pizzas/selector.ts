import { RootState } from "../../store";
import { Diet } from "../../types";

export const lightSuggestionSelector = (state: RootState) =>
  state.lightPizzas.suggested;

export const lightSuggestionDietSelector = (name: Diet) => (state: RootState) =>
  state.lightPizzas.suggested[name];

export const lightStateSelector = (state: RootState) => state.lightPizzas.state;

export const lightQuantitySelector = (state: RootState) =>
  state.lightPizzas.form.quantity;
