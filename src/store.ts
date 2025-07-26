import { configureStore } from "@reduxjs/toolkit";
import { peopleReducer, setNumber, StoredPeople } from "./modules/people/slice";
import { pizzasReducer, setPizzas, StoredPizzas } from "./modules/pizzas/slice";
import {
  paramsReducer,
  setBadThresholds,
  setNeverShowAgain,
  setOkayThresholds,
  setSlices,
  StoredParams,
} from "./modules/params/slice";
import {
  loadPizzeria,
  pizzeriasReducer,
  setPizzerias,
  StoredPizzerias,
} from "./modules/pizzerias/slice";
import { overlaysReducer } from "./modules/overlays/slice";
import { lightPizzasReducer } from "./modules/light-pizzas/slice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    pizzaList: pizzasReducer,
    lightPizzas: lightPizzasReducer,
    pizzerias: pizzeriasReducer,
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
initPizzerias();
initParameters();
initPeople();
initPizzas();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

function initPizzerias() {
  const storedPizzeriasString = localStorage.getItem("pizzerias");
  if (storedPizzeriasString === null) return;
  const storedPizzerias: StoredPizzerias = JSON.parse(storedPizzeriasString);
  if (storedPizzerias.version === 1) {
    store.dispatch(setPizzerias(storedPizzerias.pizzerias));
  }
  if (storedPizzerias.version === 2) {
    store.dispatch(setPizzerias(storedPizzerias.pizzerias));
    if (storedPizzerias.loaded !== undefined) {
      store.dispatch(loadPizzeria(storedPizzerias.loaded));
    }
  }
}

function initParameters() {
  const storedParametersString = localStorage.getItem("parameters");
  if (storedParametersString === null) return;
  const storedParams: StoredParams = JSON.parse(storedParametersString);
  if (storedParams.version === 1) {
    store.dispatch(setSlices(storedParams.slices));
    store.dispatch(setOkayThresholds(storedParams.thresholds.okay));
    store.dispatch(setBadThresholds(storedParams.thresholds.bad));
  }
  if (storedParams.version === 2) {
    store.dispatch(setSlices(storedParams.slices));
    store.dispatch(setOkayThresholds(storedParams.thresholds.okay));
    store.dispatch(setBadThresholds(storedParams.thresholds.bad));
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
    })
  );
  store.dispatch(
    setNumber({ quantity: storedPeople.vegetarian, type: "vegetarian" })
  );
  store.dispatch(setNumber({ quantity: storedPeople.vegan, type: "vegan" }));
}

function initPizzas() {
  const storedPizzasString = localStorage.getItem("pizzas");
  if (storedPizzasString === null) return;
  const storedPizzas: StoredPizzas = JSON.parse(storedPizzasString);
  store.dispatch(
    setPizzas(storedPizzas.pizzas.map((p) => ({ ...p, editable: false })))
  );
}
