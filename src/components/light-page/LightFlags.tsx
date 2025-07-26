import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { lightSuggestionSelector } from "../../modules/light-pizzas/selector";
import { desktopSize, lightPizzas } from "../../services/constants";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { useMemo } from "react";
import { diets } from "../../types";
import { peopleSelector } from "../../modules/people/selector";
import { averageCaseScenario } from "../../services/calculatorService";
import { LightPizzaFlag } from "../utils/PizzaFlag";

export function LightFlags() {
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
            <LightPizzaFlag diet={diet} quantity={peopleAteRandomAvg[diet]} />
          </div>
        ))}
      </Desktop>
      <Mobile>
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            {dietToDisplay.slice(0, 2).map((diet) => (
              <div
                className="w-[calc(50%-0.25rem)]"
                key={diet}
                data-testid={`${diet}-flag-container`}
              >
                <LightPizzaFlag
                  diet={diet}
                  quantity={peopleAteRandomAvg[diet]}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {dietToDisplay.slice(2).map((diet) => (
              <div
                className="w-[calc(50%-0.25rem)]"
                key={diet}
                data-testid={`${diet}-flag-container`}
              >
                <LightPizzaFlag
                  diet={diet}
                  quantity={peopleAteRandomAvg[diet]}
                />
              </div>
            ))}
          </div>
        </div>
      </Mobile>
    </div>
  );
}
