import { useSelector } from "react-redux";
import { DietIcon } from "../icons/DietIcon";
import { Diet, dietTranslationMap } from "../../types";
import { useTranslation } from "react-i18next";
import { lightSuggestionDietSelector } from "../../modules/light-pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import { dietOrder } from "../../services/calculatorService";
import { IntegerInput } from "../utils/IntegerInput";
import { setLightSuggestionForDiet } from "../../modules/light-pizzas/slice";
import { useAppDispatch } from "../../hooks";

type LightSuggestionDisplayProps = {
  diet: Diet;
  edit: boolean;
};

export function LightSuggestionDisplay({
  diet,
  edit,
}: LightSuggestionDisplayProps) {
  const { t } = useTranslation();
  const suggestion = useSelector(lightSuggestionDietSelector(diet));
  const people = useSelector(peopleSelector);
  const dispatch = useAppDispatch();

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
    suggestion !== 0 && (
      <div className="flex gap-4 bg-amber-200 rounded-lg px-2 items-center w-full">
        <div className="flex gap-1">
          {dietsToDisplay.map((d) => (
            <DietIcon key={d} color="Color" type={d} className="size-6" />
          ))}
          {biggestLine - dietsToDisplay.length === 2 && (
            <div className="size-6"></div>
          )}
          {biggestLine - dietsToDisplay.length >= 1 && (
            <div className="size-6"></div>
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
            min={1}
          />
        ) : (
          <span>{suggestion}</span>
        )}
        <span>{t(nameKey, { count: suggestion })}</span>
      </div>
    )
  );
}

function pizzaNameKey(dietsToDisplay: Diet[]) {
  return `light-${dietsToDisplay
    .map((d) => dietTranslationMap.get(d))
    .join("-")}-pizza-quantity`;
}
