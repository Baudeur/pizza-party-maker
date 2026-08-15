import { LightSuggestion } from "../modules/light-pizzas/slice";
import { LIGHT_FAIRNESS_MIN } from "./constants";
import { suggestLess, suggestMore, suggestPizzas } from "./suggestionService";
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

export function suggest(
  start: () => void,
  success: (data: LightSuggestion) => void,
  error: () => void,
  end: () => void,
  params: SuggestMessage,
) {
  useWorker<LightSuggestion>(
    start,
    success,
    error,
    end,
    () => suggestPizzas(params.people, params.minQuantity, LIGHT_FAIRNESS_MIN),
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
