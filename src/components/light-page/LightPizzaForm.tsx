import { useTranslation } from "react-i18next";
import { LightPeopleCategory } from "./LightPeopleCategory";
import { SlicesIcon } from "../icons/SlicesIcon";
import { Button } from "../utils/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import {
  SuggestedQuantityPerPizza,
  suggestPizzas,
} from "../../services/suggestionService";
import workerUrl from "/src/services/workerService?worker&url";
import { lightPizzas } from "../../services/constants";
import { OptionSelect } from "../utils/OptionSelect";
import { useAppDispatch } from "../../hooks";
import {
  LightFairness,
  LigthSuggestion,
  setLightFormFairness,
  setLightState,
  setLightSuggestion,
} from "../../modules/light-pizzas/slice";
import { lightFairnessSelector } from "../../modules/light-pizzas/selector";

const maxFairness = { okay: 105, bad: 110 };
const medFairness = { okay: 125, bad: 150 };
const lowFairness = { okay: 150, bad: 200 };

const selectMap = new Map<number, LightFairness>();
selectMap.set(0, maxFairness);
selectMap.set(1, medFairness);
selectMap.set(2, lowFairness);

function toLightSuggestion(value: SuggestedQuantityPerPizza) {
  const rep: LigthSuggestion = {
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

export function LightPizzaForm() {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(8);
  const { okay } = useSelector(lightFairnessSelector);
  const people = useSelector(peopleSelector);
  const dispatch = useAppDispatch();

  const handleCalculate = () => {
    dispatch(setLightState("loading"));

    if (window.Worker) {
      const suggestWorker = new Worker(workerUrl, { type: "module" });
      suggestWorker.onmessage = (ev) => {
        dispatch(setLightSuggestion(toLightSuggestion(ev.data)));
        dispatch(setLightState("done"));
      };
      suggestWorker.onerror = (event) => {
        event.preventDefault();
        dispatch(setLightState("form"));
      };
      suggestWorker.postMessage({
        pizzas: lightPizzas,
        people,
        minQuantity: quantity / 8,
        suggestMode: "lowerCost",
        fairness: okay,
      });
    } else {
      dispatch(
        setLightSuggestion(
          toLightSuggestion(
            suggestPizzas(lightPizzas, people, quantity / 8, "lowerCost", okay)
          )
        )
      );
      dispatch(setLightState("done"));
    }
  };

  return (
    <div>
      <span className="text-xl mb-2">{t("light-people-label")}</span>
      <div className="flex justify-between w-full">
        <LightPeopleCategory diet="normal" />
        <LightPeopleCategory diet="pescoVegetarian" />
        <LightPeopleCategory diet="vegetarian" />
        <LightPeopleCategory diet="vegan" />
      </div>
      <hr className="border-black my-2" />
      <span className="text-xl mb-2">{t("light-fairness-label")}</span>
      <OptionSelect
        color="yellow"
        onSelect={(selected) => {
          dispatch(
            setLightFormFairness(selectMap.get(selected) ?? medFairness)
          );
        }}
        options={[
          {
            label: t("light-fairness-strict"),
            title: t("light-fairness-strict"),
          },
          {
            label: t("light-fairness-medium"),
            title: t("light-fairness-medium"),
          },
          {
            label: t("light-fairness-lenient"),
            title: t("light-fairness-lenient"),
          },
        ]}
      />
      <hr className="border-black my-2" />
      <span className="text-xl mb-2">{t("light-quantity-label")}</span>
      <div className="flex flex-col gap-2 w-full mb-2 items-center">
        <SlicesIcon quantity={quantity} height={4} />
        <input
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
          type="range"
          min={1}
          max={16}
          step={1}
          className={`accent-green-500 touch-none w-full`}
        />
      </div>
      <div className="flex w-full justify-center">
        <Button
          className="rounded-lg text-lg px-4"
          color="green"
          onClick={handleCalculate}
          title={t("light-compute-label")}
        >
          {t("light-compute-label")}
        </Button>
      </div>
    </div>
  );
}
