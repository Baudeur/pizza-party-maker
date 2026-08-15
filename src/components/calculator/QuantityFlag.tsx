import { useTranslation } from "react-i18next";
import sliceIcon from "../../assets/Pizza.png";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { getTotalPeople } from "../../services/calculatorService";
import {
  lightQuantitySelector,
  lightSuggestionSelector,
} from "../../modules/light-pizzas/selector";
import { diets } from "../../types";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export function LightQuantityFlag() {
  const suggestion = useSelector(lightSuggestionSelector);
  const people = useSelector(peopleSelector);
  const quantity = useSelector(lightQuantitySelector);
  const { t } = useTranslation();

  const originalTotal = Math.ceil((quantity / 8) * getTotalPeople(people));
  const currentTotal = diets.reduce((acc, curr) => acc + suggestion[curr], 0);
  const diff = currentTotal - originalTotal;

  return (
    <div
      className={`bg-amber-300 rounded-lg flex items-center w-fit min-w-72 cursor-default ${
        diff === 0 ? "m-[2px]" : "border-2 border-orange-700"
      }`}
      data-testid={"light-quantity-flag"}
    >
      <div
        className={`flex items-center justify-center rounded-lg shadow-[10px_0px_15px_-3px_rgb(0,0,0,0.1),4px_0px_6px_-4px_rgb(0,0,0,0.1)]`}
      >
        <span>
          <img src={sliceIcon} className="size-5 m-2" />
        </span>
      </div>
      <div className="flex justify-center w-[calc(100%-1.75rem)]">
        <span
          className={`font-bold flex items-center text-lg ${
            diff !== 0 && "text-orange-700"
          }`}
        >
          {diff === 0 && t("light-quantity-exact")}
          {diff > 0 && (
            <>
              <ArrowBigUp
                className="fill-orange-700"
                stroke="black"
                strokeWidth={0}
              />
              {t("light-quantity-extra", { count: diff })}
            </>
          )}
          {diff < 0 && (
            <>
              <ArrowBigDown
                className="fill-orange-700"
                stroke="black"
                strokeWidth={0}
              />
              {t("light-quantity-missing", { count: -diff })}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
