import { useSelector } from "react-redux";
import { DietIcon } from "../icons/DietIcon";
import { Diet, dietTranslationMap } from "../../types";
import { useTranslation } from "react-i18next";
import {
  lightQuantitySelector,
  lightSuggestionDietSelector,
} from "../../modules/light-pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import { dietOrder } from "../../services/calculatorService";
import { IntegerInput } from "../utils/IntegerInput";
import { setLightSuggestionForDiet } from "../../modules/light-pizzas/slice";
import { useAppDispatch } from "../../hooks";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Button } from "../utils/Button";
import { Plus } from "lucide-react";
import { Tooltip } from "../utils/Tooltip";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { neverShowAgainSelector } from "../../modules/params/selector";
import { openOverlay } from "../../modules/overlays/slice";

type LightSuggestionDisplayProps = {
  diet: Diet;
  edit: boolean;
  more: (diet: Diet) => void;
};

export function LightSuggestionDisplay({
  diet,
  edit,
  more,
}: LightSuggestionDisplayProps) {
  const { t } = useTranslation();
  const suggestion = useSelector(lightSuggestionDietSelector(diet));
  const people = useSelector(peopleSelector);
  const quantity = useSelector(lightQuantitySelector);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const neverShowAgain = useSelector(neverShowAgainSelector);

  let dietIndex = dietOrder.indexOf(diet) - 1;
  const dietsToDisplay = [diet];
  while (dietIndex >= 0 && people[dietOrder[dietIndex]] === 0) {
    dietsToDisplay.push(dietOrder[dietIndex]);
    dietIndex--;
  }

  let biggestLine = 0;
  let line = 0;
  dietOrder.forEach((d) => {
    if (people[d] === 0) {
      line++;
    } else if (line + 1 > biggestLine) {
      biggestLine = line + 1;
      line = 0;
    }
  });

  const nameKey = pizzaNameKey(dietsToDisplay);

  return (
    people[diet] !== 0 && (
      <div className="flex gap-2">
        <div
          className={`flex bg-amber-200 rounded-lg px-2 items-center w-full ${
            isDesktop ? "h-8 gap-2" : "flex-col h-20 justify-between"
          }`}
        >
          <div
            className={`flex items-center ${
              isDesktop ? "gap-4" : "gap-4 pt-1 justify-start w-full pl-1 h-10"
            }`}
          >
            <div className={`flex ${isDesktop ? "gap-1" : "gap-3"}`}>
              {dietsToDisplay.map((d) => (
                <DietIcon
                  key={d}
                  color={suggestion === 0 ? "BW" : "Color"}
                  type={d}
                  className={`${isDesktop ? "size-6" : "size-8"} ${
                    suggestion === 0 ? "opacity-35" : ""
                  }`}
                />
              ))}
              {biggestLine - dietsToDisplay.length === 2 && (
                <div className={isDesktop ? "size-6" : "size-8"} />
              )}
              {biggestLine - dietsToDisplay.length >= 1 && (
                <div className={isDesktop ? "size-6" : "size-8"} />
              )}
            </div>
            {edit ? (
              <IntegerInput
                title={{ value: nameKey, isKey: true, isFeminin: true }}
                setValue={(value) => {
                  dispatch(
                    setLightSuggestionForDiet({ quantity: value, type: diet })
                  );
                }}
                value={suggestion}
                min={0}
              />
            ) : (
              <span
                className={`${isDesktop ? "" : "text-3xl"} ${
                  suggestion === 0 && "opacity-35"
                }`}
              >
                {suggestion}
              </span>
            )}
          </div>
          <span
            className={`${
              isDesktop ? "" : "text-sm text-left w-full pb-1 pl-1"
            } ${suggestion === 0 && "opacity-35"}`}
          >
            {t(nameKey, { count: suggestion })}
          </span>
        </div>
        {!edit && suggestion < (people[diet] * quantity) / 8 && (
          <>
            <Desktop>
              <Tooltip
                content={t(`light-less-fair-warning`, {
                  interpolation: { escapeValue: false },
                  pizza: t(nameKey, { count: 2 }),
                })}
              >
                <Button
                  onClick={() => {
                    more(diet);
                  }}
                  color="green"
                  title={t("light-less-fair-title", {
                    interpolation: { escapeValue: false },
                    pizza: t(nameKey, { count: 2 }),
                  })}
                  className={`px-2 rounded-lg text-black flex items-center gap-1`}
                >
                  <Plus size={20} />
                  {t("more")}
                </Button>
              </Tooltip>
            </Desktop>
            <Mobile>
              <Button
                onClick={() => {
                  if (neverShowAgain.plusWarning) {
                    more(diet);
                  } else {
                    dispatch(
                      openOverlay({
                        id: "LIGHT_WARNING",
                        props: {
                          confirmAction: () => more(diet),
                          confirmLabel: t("add"),
                          confirmTitle: t("light-less-fair-title", {
                            interpolation: { escapeValue: false },
                            pizza: t(nameKey, { count: 2 }),
                          }),
                          message: t(`light-warning-plus-text`, {
                            interpolation: { escapeValue: false },
                            pizza: t(nameKey, { count: 2 }),
                          }),
                          neverShowAgainKey: "plusWarning",
                        },
                      })
                    );
                  }
                }}
                color="green"
                title={t("light-less-fair-title", {
                  interpolation: { escapeValue: false },
                  pizza: t(nameKey, { count: 2 }),
                })}
                className={`px-2 rounded-lg text-black flex items-center min-h-20 flex-col`}
              >
                <Plus size={20} />
                {t("more")}
              </Button>
            </Mobile>
          </>
        )}
      </div>
    )
  );
}

function pizzaNameKey(dietsToDisplay: Diet[]) {
  return `light-${dietsToDisplay
    .map((d) => dietTranslationMap.get(d))
    .join("-")}-pizza-quantity`;
}
