import { LightSuggestion } from "../modules/light-pizzas/slice";
import { People } from "../modules/people/slice";
import { Diet } from "../types";
import { LIGHT_FAIRNESS_MIN } from "./constants";
import { suggestLess, suggestMore, suggestPizzas } from "./suggestionService";

export type SuggestMessage = {
  people: People;
  minQuantity: number;
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
    const { people, minQuantity } = e.data.suggest;
    const suggestion = suggestPizzas(people, minQuantity, LIGHT_FAIRNESS_MIN);
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
      minQuantity,
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
      minQuantity,
    );
    postMessage(reponse);
    return;
  }
};
