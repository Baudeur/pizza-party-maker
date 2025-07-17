import { useTranslation } from "react-i18next";
import { SlicesIcon } from "../icons/SlicesIcon";
import { Button } from "../utils/Button";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import {
  desktopSize,
  LIGHT_FAIRNESS_MIN,
  lightPizzas,
} from "../../services/constants";
import { useAppDispatch } from "../../hooks";
import {
  setLightFormQuantity,
  setLightState,
  setLightSuggestion,
} from "../../modules/light-pizzas/slice";
import { lightQuantitySelector } from "../../modules/light-pizzas/selector";
import { useMediaQuery } from "react-responsive";
import { LightPeopleCategory } from "../people/PeopleCategory";
import { suggest, toLightSuggestion } from "../../services/utils";
import { useMemo } from "react";
import { getTotalPeople } from "../../services/calculatorService";

export function LightPizzaForm() {
  const { t } = useTranslation();
  const quantity = useSelector(lightQuantitySelector);
  const people = useSelector(peopleSelector);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const handleCalculate = () => {
    suggest(
      () => dispatch(setLightState("loading")),
      (data) => dispatch(setLightSuggestion(toLightSuggestion(data))),
      () => dispatch(setLightState("form")),
      () => dispatch(setLightState("done")),
      {
        pizzas: lightPizzas,
        people,
        minQuantity: quantity / 8,
        suggestMode: "lowerCost",
        fairness: LIGHT_FAIRNESS_MIN,
      }
    );
  };

  const totalPeople = useMemo(() => getTotalPeople(people), [people]);

  return (
    <div>
      <span className="text-xl mb-2">{t("light-people-label")}</span>
      <div
        className={
          isDesktop ? "flex justify-around w-full" : "flex flex-col gap-4"
        }
      >
        <div
          className={
            isDesktop ? "flex justify-around w-full" : "flex justify-around"
          }
        >
          <div className="w-40">
            <LightPeopleCategory diet="normal" />
          </div>
          <div className="w-40">
            <LightPeopleCategory diet="pescoVegetarian" />
          </div>
        </div>
        <div
          className={
            isDesktop ? "flex justify-around w-full" : "flex justify-around"
          }
        >
          <div className="w-40">
            <LightPeopleCategory diet="vegetarian" />
          </div>
          <div className="w-40">
            <LightPeopleCategory diet="vegan" />
          </div>
        </div>
      </div>
      <hr className="border-black my-2" />
      <span className="text-xl mb-2">{t("light-quantity-label")}</span>
      <div className="flex flex-col gap-2 w-full mb-2 items-center">
        <SlicesIcon quantity={quantity} height={4} />
        <input
          value={quantity}
          onChange={(e) => {
            dispatch(setLightFormQuantity(Number(e.target.value)));
          }}
          type="range"
          min={1}
          max={16}
          step={1}
          className={`accent-green-500 touch-none w-full`}
        />
      </div>
      <div className="flex flex-col items-center w-full mt-8">
        <Button
          className="text-2xl px-4 min-h-12 w-52 rounded-lg"
          color="green"
          disabled={totalPeople === 0}
          onClick={handleCalculate}
          title={t("light-compute-label")}
        >
          {t("light-compute-label")}
        </Button>
        {totalPeople === 0 ? (
          <span className="text-gray-400">{t("light-0-people")}</span>
        ) : (
          <span className="h-6"></span>
        )}
      </div>
    </div>
  );
}
