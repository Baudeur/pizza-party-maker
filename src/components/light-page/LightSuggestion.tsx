import { useTranslation } from "react-i18next";
import { Button } from "../utils/Button";
import { Pencil, RotateCcw } from "lucide-react";
import { LightSuggestionDisplay } from "./LightSuggestionDisplay";
import { useAppDispatch } from "../../hooks";
import { setLightState } from "../../modules/light-pizzas/slice";
import { useMemo, useState } from "react";
import { diets } from "../../types";
import { PizzaFlag } from "../utils/PizzaFlag";
import {
  averageCaseScenario,
  stateOfDiet,
} from "../../services/calculatorService";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { desktopSize, lightPizzas } from "../../services/constants";
import {
  lightFairnessSelector,
  lightSuggestionSelector,
} from "../../modules/light-pizzas/selector";
import { useMediaQuery } from "react-responsive";

export function LightSuggestion() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const people = useSelector(peopleSelector);
  const suggestion = useSelector(lightSuggestionSelector);
  const { okay, bad } = useSelector(lightFairnessSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const dietToDisplay = useMemo(() => diets.filter((d) => people[d] > 0), []);

  const peopleAteRandomAvg = useMemo(() => {
    const pizzas = lightPizzas.map((p) => ({
      ...p,
      quantity: suggestion[p.eatenBy],
    }));
    return averageCaseScenario(100, 8, pizzas, people);
  }, [suggestion]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xl">{t("light-suggestion-title")}</p>
      <div className="flex flex-col gap-2 justify-between text-xl font-bold w-full">
        <LightSuggestionDisplay diet="normal" edit={edit} />
        <LightSuggestionDisplay diet="pescoVegetarian" edit={edit} />
        <LightSuggestionDisplay diet="vegetarian" edit={edit} />
        <LightSuggestionDisplay diet="vegan" edit={edit} />
      </div>
      {edit ? (
        <div className="w-full flex flex-col items-center gap-2">
          <p className={isDesktop ? "text-xl w-[600px] text-wrap" : ""}>
            {t("light-suggestion-flag")}
          </p>
          <div className="flex w-full gap-2 justify-between">
            {dietToDisplay.map((diet) => (
              <div
                className="h-full w-full"
                key={diet}
                data-testid={`${diet}-flag-container`}
              >
                <PizzaFlag
                  flagState={stateOfDiet(
                    diet,
                    peopleAteRandomAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={diet}
                  testId={`${diet}-flag`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            setEdit(true);
          }}
          color="green"
          title={t("light-edit-button")}
          className="rounded-lg px-2 gap-2 text-xl"
        >
          <Pencil size={20} />
          {t("light-edit-button")}
        </Button>
      )}
      <Button
        onClick={() => dispatch(setLightState("form"))}
        color="orange"
        title={t("light-back-button")}
        className="rounded-lg px-2 gap-2 text-xl"
      >
        <RotateCcw size={20} />
        {t("light-back-button")}
      </Button>
    </div>
  );
}
