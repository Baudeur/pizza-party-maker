import { configureStore } from "@reduxjs/toolkit";
import { peopleReducer } from "./modules/people/slice";
import { pizzasReducer } from "./modules/pizzas/slice";
import { paramsReducer } from "./modules/params/slice";
import {
  pizzeriasReducer,
  setPizzerias,
  StoredPizzerias,
} from "./modules/pizzerias/slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    pizzaList: pizzasReducer,
    pizzerias: pizzeriasReducer,
    params: paramsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
initPizzerias();

export type RootState = ReturnType<typeof store.getState>;

function initPizzerias() {
  const storedPizzeriasString = localStorage.getItem("pizzerias");
  if (storedPizzeriasString === null) return;
  const storedPizzerias: StoredPizzerias = JSON.parse(storedPizzeriasString);
  store.dispatch(setPizzerias(storedPizzerias.pizzerias));
}
