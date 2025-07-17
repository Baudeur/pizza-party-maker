import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { lightSuggestionSelector } from "../../modules/light-pizzas/selector";
import { desktopSize, lightPizzas } from "../../services/constants";
import { Desktop } from "../utils/ReactiveComponents";
import { useMemo } from "react";
import { diets } from "../../types";
import { peopleSelector } from "../../modules/people/selector";
import { averageCaseScenario } from "../../services/calculatorService";
import { DietIcon } from "../icons/DietIcon";
import { useTranslation } from "react-i18next";

export function LightFlags() {
  const { t } = useTranslation();
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
            <div>
              <div
                className={`bg-amber-300 h-full w-full rounded-lg flex items-center min-w-32 min-h-4 cursor-default`}
              >
                <div
                  className={`flex items-center bg-amber-300 rounded-lg shadow-[10px_0px_15px_-3px_rgb(0,0,0,0.1),4px_0px_6px_-4px_rgb(0,0,0,0.1)]`}
                >
                  <DietIcon
                    type={diet}
                    color="Color"
                    className="size-5 m-2"
                    testId={"flag-container"}
                  />
                </div>
                <div className="flex flex-col mr-2 justify-center h-full w-full pt-1">
                  <span className="font-bold text-lg">
                    {t("light-quantity-slices", {
                      count: peopleAteRandomAvg[diet],
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Desktop>
    </div>
  );
}
