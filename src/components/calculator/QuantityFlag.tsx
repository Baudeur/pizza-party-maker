import { useTranslation } from "react-i18next";
import { toUnderstandableRational } from "../../services/utils";
import sliceIcon from "../../assets/Pizza.png";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { sliceSelector } from "../../modules/params/selector";
import {
  getTotalPeople,
  pizzaSlicesPerPerson,
} from "../../services/calculatorService";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import {
  lightQuantitySelector,
  lightSuggestionSelector,
} from "../../modules/light-pizzas/selector";
import { diets } from "../../types";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

type QuantityFlagProps = {
  mobileExtended?: boolean;
};

export function QuantityFlag({ mobileExtended }: QuantityFlagProps) {
  const { t } = useTranslation();
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const slices = useSelector(sliceSelector);
  const slicesPerPerson = pizzaSlicesPerPerson(people, pizzas, slices);

  return (
    <EitherDesktopOrMobile>
      <div
        className="text-3xl font-bold w-full"
        data-testid="quantity-flag-container"
      >
        <div className="mb-2 flex justify-center">
          <img
            src={sliceIcon}
            className="size-8"
            alt={t("alt-pizza-icon")}
            data-testid="quantity-flag-icon"
          />
        </div>
        <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg" data-testid="quantity-flag-slices">
            {slicesPerPerson} {t("info-display-slices")}
          </span>
          <span className="text-lg" data-testid="quantity-flag-pizzas">
            {toUnderstandableRational(slicesPerPerson, slices)}{" "}
            {t("info-display-pizzas")}
          </span>
        </div>
      </div>
      <div
        className={`bg-amber-400 rounded-lg w-1/2 flex justify-between px-2 font-bold items-center ${
          mobileExtended ? "h-14" : "h-8"
        }`}
      >
        <img
          src={sliceIcon}
          className="size-6"
          alt={t("alt-pizza-icon")}
          data-testid="quantity-flag-icon"
        />
        <div className="flex flex-col w-full">
          <span
            className="text-lg text-right"
            data-testid="quantity-flag-pizzas"
          >
            {toUnderstandableRational(slicesPerPerson, slices)}{" "}
            <span className="text-sm">{t("info-display-pizzas")}</span>
          </span>
          {mobileExtended && (
            <span
              className="text-lg text-right"
              data-testid="quantity-flag-pizzas"
            >
              {slicesPerPerson}{" "}
              <span className="text-sm">{t("info-display-slices")}</span>
            </span>
          )}
        </div>
      </div>
    </EitherDesktopOrMobile>
  );
}

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
