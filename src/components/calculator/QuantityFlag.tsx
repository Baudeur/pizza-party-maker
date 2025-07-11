import { useTranslation } from "react-i18next";
import { toUnderstandableRational } from "../../services/utils";
import sliceIcon from "../../assets/Pizza.png";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { sliceSelector } from "../../modules/params/selector";
import { pizzaSlicesPerPerson } from "../../services/calculatorService";
import {
  Desktop,
  EitherDesktopOrMobile,
  Mobile,
} from "../utils/ReactiveComponents";
import { lightSuggestionSelector } from "../../modules/light-pizzas/selector";
import { diets } from "../../types";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

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
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const slices = diets.reduce((acc, diet) => acc + suggestion[diet], 0) * 8;
  const persons = diets.reduce((acc, diet) => acc + people[diet], 0);

  const slicesPerPerson = slices / persons;
  const pizzasPerPerson = toUnderstandableRational(slicesPerPerson, 8);

  return (
    <div
      className={`bg-amber-300 w-full rounded-lg flex items-center min-w-32 cursor-default`}
      data-testid={"quantity-flag"}
    >
      <div
        className={`flex items-center justify-center rounded-lg shadow-[10px_0px_15px_-3px_rgb(0,0,0,0.1),4px_0px_6px_-4px_rgb(0,0,0,0.1)]`}
      >
        <span>
          <img
            src={sliceIcon}
            className={isDesktop ? "size-7 m-2" : "size-10 m-2"}
          />
        </span>
      </div>
      <div className="flex flex-col justify-center w-[calc(100%-2.75rem)]">
        <Desktop>
          <span className="font-bold text-xl">
            {t("light-quantity-slices", {
              count: Math.round(slicesPerPerson),
            }) +
              " " +
              t("light-quantity-equal") +
              " " +
              t("light-quantity-pizzas", {
                count: Math.ceil(slicesPerPerson / 8),
                pizzas: pizzasPerPerson,
                interpolation: { escapeValue: false },
              }) +
              " " +
              t("light-quantity-per-persons")}
          </span>
        </Desktop>
        <Mobile>
          <span className="font-bold text-xl">
            {t("light-quantity-slices", {
              count: Math.round(slicesPerPerson),
            }) +
              " " +
              t("light-quantity-equal") +
              " " +
              t("light-quantity-pizzas", {
                count: Math.ceil(slicesPerPerson / 8),
                pizzas: pizzasPerPerson,
                interpolation: { escapeValue: false },
              })}
          </span>
          <span className="text-xl font-bold">
            {" "}
            {t("light-quantity-per-persons")}
          </span>
        </Mobile>
      </div>
    </div>
  );
}
