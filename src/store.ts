import { configureStore } from "@reduxjs/toolkit";
import { peopleReducer, setNumber, StoredPeople } from "./modules/people/slice";
import {
  paramsReducer,
  setNeverShowAgain,
  StoredParams,
} from "./modules/params/slice";
import { overlaysReducer } from "./modules/overlays/slice";
import { lightPizzasReducer } from "./modules/light-pizzas/slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    lightPizzas: lightPizzasReducer,
    params: paramsReducer,
    overlays: overlaysReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["overlays.overlayProps.confirmAction"],
        ignoredActions: ["overlays/openOverlay"],
      },
    }),
});
initParameters();
initPeople();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

function initParameters() {
  const storedParametersString = localStorage.getItem("parameters");
  if (storedParametersString === null) return;
  const storedParams: StoredParams = JSON.parse(storedParametersString);
  if (storedParams.version === 2) {
    store.dispatch(setNeverShowAgain(storedParams.neverShowAgain));
  }
  if (storedParams.version === 3) {
    store.dispatch(setNeverShowAgain(storedParams.neverShowAgain));
  }
}

function initPeople() {
  const storedPeopleString = localStorage.getItem("people");
  if (storedPeopleString === null) return;
  const storedPeople: StoredPeople = JSON.parse(storedPeopleString);
  store.dispatch(setNumber({ quantity: storedPeople.normal, type: "normal" }));
  store.dispatch(
    setNumber({
      quantity: storedPeople.pescoVegetarian,
      type: "pescoVegetarian",
    }),
  );
  store.dispatch(
    setNumber({ quantity: storedPeople.vegetarian, type: "vegetarian" }),
  );
  store.dispatch(setNumber({ quantity: storedPeople.vegan, type: "vegan" }));
}
