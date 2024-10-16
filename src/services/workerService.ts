import { People } from "../modules/people/slice";
import { Pizza } from "../modules/pizzas/slice";
import { SuggestMode, suggestPizzas } from "./suggestionService";

type SuggestMessage = {
  pizzas: Pizza[];
  people: People;
  minQuantity: number;
  suggestMode: SuggestMode;
  fairness?: number;
};

onmessage = (e: MessageEvent<SuggestMessage>) => {
  const { pizzas, people, minQuantity, suggestMode, fairness } = e.data;
  const suggestion = suggestPizzas(
    pizzas,
    people,
    minQuantity,
    suggestMode,
    fairness
  );
  postMessage(suggestion);
};
