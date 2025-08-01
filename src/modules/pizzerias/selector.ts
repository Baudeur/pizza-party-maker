import { RootState } from "../../store";

export const pizzeriasSelector = (state: RootState) =>
  state.pizzerias.pizzerias;

export const loadedPizzeriaSelector = (state: RootState) =>
  state.pizzerias.loaded;

export const pizzeriaStateSelector = (state: RootState) =>
  state.pizzerias.pizzeriaState;
