import { useSelector } from "react-redux";
import {
  PeopleAte,
  pizzaPricePerPerson,
  pizzaPriceTotal,
  pizzaSlicesPerPerson,
  stateOfDiet,
} from "../../services/calculatorService";
import { diets } from "../../types";
import { PizzaFlag } from "../utils/PizzaFlag";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import {
  sliceSelector,
  thresholdsSelector,
} from "../../modules/params/selector";
import { priceToString, toUnderstandableRational } from "../../services/utils";
import priceIcon from "../../assets/Cash.png";
import sliceIcon from "../../assets/Pizza.png";
import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";

type InfoDisplayProps = {
  peopleAteAvg: PeopleAte;
  mobileExtended?: boolean;
};

export function InfoDisplay({
  peopleAteAvg,
  mobileExtended = false,
}: Readonly<InfoDisplayProps>) {
  const { t } = useTranslation();
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const slices = useSelector(sliceSelector);
  const { okay, bad } = useSelector(thresholdsSelector);

  const slicesPerPerson = pizzaSlicesPerPerson(people, pizzas, slices);
  const pricePerPerson = pizzaPricePerPerson(people, pizzas);
  const priceTotal = pizzaPriceTotal(pizzas);

  return (
    <EitherDesktopOrMobile>
      <div className="flex gap-2 w-full">
        {diets.map((diet) => (
          <div
            className="h-full w-full"
            key={diet}
            data-testid={`${diet}-flag-container`}
          >
            <PizzaFlag
              flagState={stateOfDiet(diet, peopleAteAvg, people, okay, bad)}
              diet={diet}
              testId={`${diet}-flag`}
            />
          </div>
        ))}
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
      </div>
      <div className="flex flex-col gap-2">
        <div className={`flex w-full gap-2 ${mobileExtended && "flex-col"}`}>
          {mobileExtended ? (
            <>
              <div className="flex gap-2 w-full">
                <PizzaFlag
                  key={"normal"}
                  flagState={stateOfDiet(
                    "normal",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"normal"}
                  testId={`${"normal"}-flag`}
                  mobileExtended={mobileExtended}
                />
                <PizzaFlag
                  key={"pescoVegetarian"}
                  flagState={stateOfDiet(
                    "pescoVegetarian",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"pescoVegetarian"}
                  testId={`${"pescoVegetarian"}-flag`}
                  mobileExtended={mobileExtended}
                />
              </div>
              <div className="flex gap-2 w-full">
                <PizzaFlag
                  key={"vegetarian"}
                  flagState={stateOfDiet(
                    "vegetarian",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"vegetarian"}
                  testId={`${"vegetarian"}-flag`}
                  mobileExtended={mobileExtended}
                />
                <PizzaFlag
                  key={"vegan"}
                  flagState={stateOfDiet(
                    "vegan",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"vegan"}
                  testId={`${"vegan"}-flag`}
                  mobileExtended={mobileExtended}
                />
              </div>
            </>
          ) : (
            <>
              {diets.map((diet) => (
                <PizzaFlag
                  key={diet}
                  flagState={stateOfDiet(diet, peopleAteAvg, people, okay, bad)}
                  diet={diet}
                  testId={`${diet}-flag`}
                  mobileExtended={mobileExtended}
                />
              ))}
            </>
          )}
        </div>
        <div className="flex gap-2 w-full">
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
                    {priceToString(pricePerPerson)} € /{" "}
                    {t("info-display-person")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </EitherDesktopOrMobile>
  );
}
