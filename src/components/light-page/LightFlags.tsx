import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  lightFairnessSelector,
  lightSuggestionSelector,
} from "../../modules/light-pizzas/selector";
import { desktopSize, lightPizzas } from "../../services/constants";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { useMemo } from "react";
import { diets } from "../../types";
import { peopleSelector } from "../../modules/people/selector";
import { LightPizzaFlag } from "../utils/PizzaFlag";
import {
  averageCaseScenario,
  stateOfDiet,
} from "../../services/calculatorService";
import { LightQuantityFlag } from "../calculator/QuantityFlag";

export function LightFlags() {
  const { okay, bad } = useSelector(lightFairnessSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const people = useSelector(peopleSelector);
  const suggestion = useSelector(lightSuggestionSelector);

  const dietToDisplay = useMemo(() => diets.filter((d) => people[d] > 0), []);

  const peopleAteRandomAvg = useMemo(() => {
    const pizzas = lightPizzas.map((p) => ({
      ...p,
      quantity: suggestion[p.eatenBy],
    }));
    return averageCaseScenario(100, 8, pizzas, people);
  }, [suggestion]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={`flex w-full gap-2 ${
          isDesktop ? "justify-between" : "flex-col"
        }`}
      >
        <Desktop>
          {dietToDisplay.map((diet) => (
            <div
              className="h-full w-full"
              key={diet}
              data-testid={`${diet}-flag-container`}
            >
              <LightPizzaFlag
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
        </Desktop>
        <Mobile>
          <div className="flex justify-between gap-2 w-full">
            <div className="w-full">
              {dietToDisplay.length >= 1 ? (
                <LightPizzaFlag
                  flagState={stateOfDiet(
                    dietToDisplay[0],
                    peopleAteRandomAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={dietToDisplay[0]}
                  testId={`${dietToDisplay[0]}-flag`}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="w-full">
              {dietToDisplay.length >= 2 ? (
                <LightPizzaFlag
                  flagState={stateOfDiet(
                    dietToDisplay[1],
                    peopleAteRandomAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={dietToDisplay[1]}
                  testId={`${dietToDisplay[1]}-flag`}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex justify-between gap-2 w-full">
            <div className="w-full">
              {dietToDisplay.length >= 3 ? (
                <LightPizzaFlag
                  flagState={stateOfDiet(
                    dietToDisplay[2],
                    peopleAteRandomAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={dietToDisplay[2]}
                  testId={`${dietToDisplay[2]}-flag`}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="w-full">
              {dietToDisplay.length >= 4 ? (
                <LightPizzaFlag
                  flagState={stateOfDiet(
                    dietToDisplay[3],
                    peopleAteRandomAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={dietToDisplay[3]}
                  testId={`${dietToDisplay[3]}-flag`}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </Mobile>
      </div>
      <div className="w-full">
        <LightQuantityFlag />
      </div>
    </div>
  );
}
