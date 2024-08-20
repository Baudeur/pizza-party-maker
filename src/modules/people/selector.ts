import { RootState } from "../../store";
import { Diet } from "../../types";

export const peopleSelector = (state: RootState) => state.people;

export const peopleDietSelector = (name: Diet) => (state: RootState) =>
  state.people[name];
