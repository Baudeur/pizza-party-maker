import { configureStore } from "@reduxjs/toolkit";
import { peopleReducer } from "./modules/people/slice";
import { pizzasReducer } from "./modules/pizzas/slice";
import { paramsReducer } from "./modules/params/slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    pizzaList: pizzasReducer,
    params: paramsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
