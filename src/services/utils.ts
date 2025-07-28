import { LightSuggestion } from "../modules/light-pizzas/slice";
import { PizzaQuantity } from "../modules/pizzas/selector";
import { Diet } from "../types";
import {
  SuggestedQuantityPerPizza,
  suggestLess,
  suggestMore,
  suggestPizzas,
} from "./suggestionService";
import {
  LessMessage,
  Message,
  MoreMessage,
  SuggestMessage,
} from "./workerService";
import workerUrl from "/src/services/workerService?worker&url";

export function shuffleArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const acceptableValues = [
  "0",
  "1",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "3/4",
  "1/5",
  "2/5",
  "3/5",
  "4/5",
  "1/6",
  "5/6",
  "1/8",
  "3/8",
  "5/8",
  "7/8",
];

export function toUnderstandableRational(slicesAte: number, slices: number) {
  function parseRational(str: string): number {
    if (str === "0" || str === "1") return Number(str);
    const splitted = str.split("/");
    return Number(splitted[0]) / Number(splitted[1]);
  }
  let value = slicesAte / slices;
  const entier = Math.floor(value);
  value = value - entier;
  let res = "";
  let best = 1;
  for (const elem of acceptableValues) {
    const ecart = Math.abs(value - parseRational(elem));
    if (ecart < best) {
      res = elem;
      best = ecart;
    }
  }
  if (res === "0") return entier.toString();
  if (res === "1") return (entier + 1).toString();
  if (entier === 0) return "~" + res;
  return "~" + entier.toString() + "+" + res;
}

export function calcDiet(diet: Diet, type: "prev" | "next"): Diet {
  if (type === "prev") {
    if (diet === "vegan") return "vegetarian";
    if (diet === "vegetarian") return "pescoVegetarian";
    return "normal";
  } else {
    if (diet === "normal") return "pescoVegetarian";
    if (diet === "pescoVegetarian") return "vegetarian";
    return "vegan";
  }
}

export function pizzaQuantityEquality(
  pizzaQuantity1: PizzaQuantity[],
  pizzaQuantity2: PizzaQuantity[]
) {
  if (pizzaQuantity1.length !== pizzaQuantity2.length) return false;
  return pizzaQuantity1
    .map((pq) => {
      const pq2 = pizzaQuantity2.find((elem) => elem.eatenBy === pq.eatenBy);
      if (pq2 === null) return false;
      if (pq2?.quantity !== pq.quantity) return false;
      return true;
    })
    .every((bool) => bool);
}

export function priceToString(number: number) {
  if (Number.isInteger(number)) {
    return number.toFixed(0);
  } else {
    return number.toFixed(2);
  }
}

export function formatNameForTestId(name: string) {
  const regexArray = name
    .toLowerCase()
    .replace(/ /g, "-")
    .match(/([a-z]|\d|-)*/g);
  if (regexArray) return regexArray.join("");
  return "";
}

export function compareDiet(a: Diet, b: Diet) {
  if (a === b) return 0;
  if (b === "normal") return 1;
  if (b === "pescoVegetarian" && a !== "normal") return 1;
  if (b === "vegetarian" && a === "vegan") return 1;
  return -1;
}

export function toLightSuggestion(value: SuggestedQuantityPerPizza) {
  const rep: LightSuggestion = {
    normal: 0,
    pescoVegetarian: 0,
    vegetarian: 0,
    vegan: 0,
  };
  value.forEach((value, key) => {
    rep[key.eatenBy] = value;
  });
  return rep;
}

export function suggest(
  start: () => void,
  success: (data: SuggestedQuantityPerPizza) => void,
  error: () => void,
  end: () => void,
  params: SuggestMessage
) {
  useWorker<SuggestedQuantityPerPizza>(
    start,
    success,
    error,
    end,
    () =>
      suggestPizzas(
        params.pizzas,
        params.people,
        params.minQuantity,
        params.suggestMode,
        params.fairness
      ),
    { suggest: params, more: undefined, less: undefined }
  );
}

type MoreLessResponse = { suggestion: LightSuggestion; fairness: number };

export function more(
  start: () => void,
  success: (data: MoreLessResponse) => void,
  error: () => void,
  end: () => void,
  params: MoreMessage
) {
  useWorker<MoreLessResponse>(
    start,
    success,
    error,
    end,
    () =>
      suggestMore(
        params.suggestedQuantity,
        params.people,
        params.diet,
        params.fairness,
        params.minQuantity
      ),
    { suggest: undefined, more: params, less: undefined }
  );
}

export function less(
  start: () => void,
  success: (data: MoreLessResponse) => void,
  error: () => void,
  end: () => void,
  params: LessMessage
) {
  useWorker<MoreLessResponse>(
    start,
    success,
    error,
    end,
    () =>
      suggestLess(
        params.suggestedQuantity,
        params.people,
        params.fairness,
        params.minQuantity
      ),
    { suggest: undefined, more: undefined, less: params }
  );
}

function useWorker<T>(
  start: () => void,
  success: (data: T) => void,
  error: () => void,
  end: () => void,
  fallback: () => T,
  params: Message
) {
  start();
  if (window.Worker) {
    const suggestWorker = new Worker(workerUrl, { type: "module" });
    suggestWorker.onmessage = (ev) => {
      success(ev.data);
      end();
    };
    suggestWorker.onerror = (event) => {
      event.preventDefault();
      error();
    };
    suggestWorker.postMessage(params);
  } else {
    try {
      success(fallback());
    } catch (_) {
      error();
    }
    end();
  }
}
