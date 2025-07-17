import { useTranslation } from "react-i18next";
import { Button } from "../utils/Button";
import { Pencil, RotateCcw, Scale } from "lucide-react";
import { LightSuggestionDisplay } from "./LightSuggestionDisplay";
import { useAppDispatch } from "../../hooks";
import {
  setLightState,
  setLightSuggestion,
} from "../../modules/light-pizzas/slice";
import { useCallback, useMemo, useState } from "react";
import { Diet, diets } from "../../types";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { desktopSize, LIGHT_FAIRNESS_MIN } from "../../services/constants";
import { useMediaQuery } from "react-responsive";
import { LightFlags } from "./LightFlags";
import { Spinner } from "../utils/Spinner";
import { LightQuantityFlag } from "../calculator/QuantityFlag";
import {
  lightQuantitySelector,
  lightSuggestionSelector,
} from "../../modules/light-pizzas/selector";
import { less, more } from "../../services/utils";

export function LightSuggestion() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const people = useSelector(peopleSelector);
  const suggestion = useSelector(lightSuggestionSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const quantity = useSelector(lightQuantitySelector);
  const [isLoading, setIsLoading] = useState(false);
  const [fairness, setFairness] = useState(LIGHT_FAIRNESS_MIN);

  const dietPeopleCount = useMemo(
    () => diets.reduce((acc, curr) => (people[curr] === 0 ? acc : acc + 1), 0),
    [people]
  );

  const handleMore = useCallback(
    (diet: Diet) => {
      more(
        () => setIsLoading(true),
        (data) => {
          const { suggestion: newSuggestion, fairness: newFairness } = data;
          setFairness(newFairness);
          dispatch(setLightSuggestion(newSuggestion));
        },
        () => setIsLoading(false),
        () => setIsLoading(false),
        {
          suggestedQuantity: suggestion,
          people,
          diet,
          fairness,
          minQuantity: quantity / 8,
        }
      );
    },
    [people, fairness, quantity, suggestion]
  );

  const handleLess = useCallback(() => {
    less(
      () => setIsLoading(true),
      (data) => {
        const { suggestion: newSuggestion, fairness: newFairness } = data;
        setFairness(newFairness);
        dispatch(setLightSuggestion(newSuggestion));
      },
      () => setIsLoading(false),
      () => setIsLoading(false),
      {
        suggestedQuantity: suggestion,
        people,
        fairness,
        minQuantity: quantity / 8,
      }
    );
  }, [people, fairness, quantity, suggestion]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xl">{t("light-suggestion-title")}</p>
      {isLoading ? (
        <div className="flex items-center" style={{ height: `12rem` }}>
          <Spinner size={16} />
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-between text-xl font-bold w-full">
          <LightSuggestionDisplay diet="normal" edit={edit} more={handleMore} />
          <LightSuggestionDisplay
            diet="pescoVegetarian"
            edit={edit}
            more={handleMore}
          />
          <LightSuggestionDisplay
            diet="vegetarian"
            edit={edit}
            more={handleMore}
          />
          <LightSuggestionDisplay diet="vegan" edit={edit} more={handleMore} />
          {dietPeopleCount < 4 && <div className="h-8" />}
          {dietPeopleCount < 3 && <div className="h-8" />}
          {dietPeopleCount < 2 && <div className="h-8" />}
          {dietPeopleCount === 1 && (
            <span className="text-sm text-gray-600">{t("light-why")}</span>
          )}
          {edit ? (
            <div className="h-8" />
          ) : (
            <Button
              onClick={handleLess}
              color="green"
              title={t("light-more-fair-button")}
              className="px-2 rounded-lg flex items-center gap-1"
              disabled={fairness === 110}
            >
              <Scale size={20} />
              {t("light-more-fair-button")}
            </Button>
          )}
        </div>
      )}
      <p className={isDesktop ? "text-xl w-[600px] text-wrap" : ""}>
        {t("light-suggestion-flag")}
      </p>
      <LightFlags />
      {edit ? (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full flex justify-center">
            <LightQuantityFlag />
          </div>
        </div>
      ) : (
        <>
          {/* <div className="flex gap-2">
            <Button
              onClick={() => {
                setFairness(fairness - 10);
                handleCalculate();
              }}
              disabled={fairness == LIGHT_FAIRNESS_MIN}
              color="green"
              title={t("light-more-fair-button")}
              className="rounded-lg px-2 gap-2 text-xl w-48"
            >
              <Scale size={20} />
              {t("light-more-fair-button")}
            </Button>
            <Tooltip
              content={t(
                `light-less-fair-${dietTranslationMap.get(highestDiet)}-warning`
              )}
              delayed={500}
            >
              <Button
                onClick={() => {
                  setFairness(fairness + 10);
                  handleCalculate();
                }}
                color="green"
                title={t(
                  `light-more-${dietTranslationMap.get(highestDiet)}-button`
                )}
                className="rounded-lg px-2 gap-2 text-xl w-48"
                disabled={diets.every((d) => suggestion[d] === people[d])}
              >
                <DietIcon color="Color" type={highestDiet} className="size-5" />
                {t(`light-more-${dietTranslationMap.get(highestDiet)}-button`)}
              </Button>
            </Tooltip>
          </div> */}
          <Button
            onClick={() => {
              setEdit(true);
            }}
            color="green"
            title={t("light-edit-button")}
            className="rounded-lg px-2 gap-2 text-xl mb-1"
          >
            <Pencil size={20} />
            {t("light-edit-button")}
          </Button>
        </>
      )}
      <Button
        onClick={() => dispatch(setLightState("form"))}
        color="orange"
        title={t("light-back-button")}
        className="rounded-lg px-2 gap-2 text-xl mt-8"
      >
        <RotateCcw size={20} />
        {t("light-back-button")}
      </Button>
    </div>
  );
}
