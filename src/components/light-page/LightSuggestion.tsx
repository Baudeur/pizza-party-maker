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
import { neverShowAgainSelector } from "../../modules/params/selector";
import { openOverlay } from "../../modules/overlays/slice";

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
  const neverShowAgain = useSelector(neverShowAgainSelector);

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
        <div
          className="flex items-center"
          style={{
            height: isDesktop
              ? `${2 + 2.5 * dietPeopleCount}rem`
              : `${2 + 5.5 * dietPeopleCount}rem`,
          }}
        >
          <Spinner size={16} testId={"light-suggestion-spinner"} />
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
              testId={"light-more-fair-button"}
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
          <Button
            onClick={() => {
              if (neverShowAgain.modifyWarning) {
                setEdit(true);
              } else {
                dispatch(
                  openOverlay({
                    id: "LIGHT_WARNING",
                    props: {
                      confirmAction: () => setEdit(true),
                      confirmLabel: t("modify"),
                      confirmTitle: t("light-edit-button"),
                      message: t("light-warning-edit-text"),
                      neverShowAgainKey: "modifyWarning",
                    },
                  })
                );
              }
            }}
            color="green"
            title={t("light-edit-button")}
            className="rounded-lg px-2 gap-2 text-xl mb-2"
            testId={"light-edit-button"}
          >
            <Pencil size={20} />
            {isDesktop ? t("light-edit-button") : t("light-edit-button-short")}
          </Button>
        </>
      )}
      <Button
        onClick={() => dispatch(setLightState("form"))}
        color="orange"
        title={t("light-back-button")}
        className="rounded-lg px-2 gap-2 text-xl mt-8"
        testId={"light-restart-button"}
      >
        <RotateCcw size={20} />
        {t("light-back-button")}
      </Button>
    </div>
  );
}
