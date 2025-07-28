import { LightSuggestion } from "../modules/light-pizzas/slice";
import { People } from "../modules/people/slice";
import { Pizza } from "../modules/pizzas/slice";
import { Diet } from "../types";
import {
  suggestLess,
  suggestMore,
  SuggestMode,
  suggestPizzas,
} from "./suggestionService";

export type SuggestMessage = {
  pizzas: Pizza[];
  people: People;
  minQuantity: number;
  suggestMode: SuggestMode;
  fairness?: number;
};

export type MoreMessage = {
  suggestedQuantity: LightSuggestion;
  people: People;
  diet: Diet;
  fairness: number;
  minQuantity: number;
};

export type LessMessage = {
  suggestedQuantity: LightSuggestion;
  people: People;
  fairness: number;
  minQuantity: number;
};

export type Message = {
  suggest: SuggestMessage | undefined;
  more: MoreMessage | undefined;
  less: LessMessage | undefined;
};

onmessage = (e: MessageEvent<Message>) => {
  if (e.data.suggest !== undefined) {
    const { pizzas, people, minQuantity, suggestMode, fairness } =
      e.data.suggest;
    const suggestion = suggestPizzas(
      pizzas,
      people,
      minQuantity,
      suggestMode,
      fairness
    );
    postMessage(suggestion);
    return;
  }
  if (e.data.more !== undefined) {
    const { suggestedQuantity, people, diet, fairness, minQuantity } =
      e.data.more;
    const reponse = suggestMore(
      suggestedQuantity,
      people,
      diet,
      fairness,
      minQuantity
    );
    postMessage(reponse);
    return;
  }
  if (e.data.less !== undefined) {
    const { suggestedQuantity, people, fairness, minQuantity } = e.data.less;
    const reponse = suggestLess(
      suggestedQuantity,
      people,
      fairness,
      minQuantity
    );
    postMessage(reponse);
    return;
  }
};
