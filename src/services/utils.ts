import { LightSuggestion } from "../modules/light-pizzas/slice";
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
  params: SuggestMessage,
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
        params.fairness,
      ),
    { suggest: params, more: undefined, less: undefined },
  );
}

type MoreLessResponse = { suggestion: LightSuggestion; fairness: number };

export function more(
  start: () => void,
  success: (data: MoreLessResponse) => void,
  error: () => void,
  end: () => void,
  params: MoreMessage,
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
        params.minQuantity,
      ),
    { suggest: undefined, more: params, less: undefined },
  );
}

export function less(
  start: () => void,
  success: (data: MoreLessResponse) => void,
  error: () => void,
  end: () => void,
  params: LessMessage,
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
        params.minQuantity,
      ),
    { suggest: undefined, more: undefined, less: params },
  );
}

function useWorker<T>(
  start: () => void,
  success: (data: T) => void,
  error: () => void,
  end: () => void,
  fallback: () => T,
  params: Message,
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
