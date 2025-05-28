import { useTranslation } from "react-i18next";
import { toUnderstandableRational } from "../../services/utils";
import sliceIcon from "../../assets/Pizza.png";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { sliceSelector } from "../../modules/params/selector";
import { pizzaSlicesPerPerson } from "../../services/calculatorService";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";

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
