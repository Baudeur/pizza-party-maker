import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import priceIcon from "../../assets/Cash.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import {
  pizzaPricePerPerson,
  pizzaPriceTotal,
} from "../../services/calculatorService";
import { priceToString } from "../../services/utils";

type PriceFlagProps = {
  mobileExtended?: boolean;
};

export function PriceFlag({ mobileExtended }: PriceFlagProps) {
  const { t } = useTranslation();
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const pricePerPerson = pizzaPricePerPerson(people, pizzas);
  const priceTotal = pizzaPriceTotal(pizzas);

  return (
    <EitherDesktopOrMobile>
      <div
        className="text-3xl font-bold w-full"
        data-testid="price-flag-container"
      >
        <div className="mb-2 flex justify-center">
          <img
            src={priceIcon}
            className="size-8"
            alt={t("alt-cash-icon")}
            data-testid="price-flag-icon"
          />
        </div>
        <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg" data-testid="price-flag-per-person">
            {priceToString(pricePerPerson)} € / {t("info-display-person")}
          </span>
          <span className="text-lg" data-testid="price-flag-total">
            {priceToString(priceTotal)} € {t("info-display-total")}
          </span>
        </div>
      </div>
      <div
        className={`bg-lime-400 rounded-lg w-1/2 flex justify-between px-2 font-bold items-center ${
          mobileExtended ? "h-14" : "h-8"
        }`}
      >
        <img
          src={priceIcon}
          className="size-6"
          alt={t("alt-cash-icon")}
          data-testid="price-flag-icon"
        />
        <div className="flex flex-col w-full">
          <span className="text-base text-right w-full">
            {priceToString(priceTotal)} € {t("info-display-total")}
          </span>
          {mobileExtended && (
            <div className="flex justify-between w-full">
              <span className="text-base text-right w-full">
                {priceToString(pricePerPerson)} € / {t("info-display-person")}
              </span>
            </div>
          )}
        </div>
      </div>
    </EitherDesktopOrMobile>
  );
}
