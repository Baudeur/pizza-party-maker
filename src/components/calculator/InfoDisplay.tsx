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
import { paramsSelector } from "../../modules/params/selector";
import { priceToString, toUnderstandableRational } from "../../services/utils";
import { DietIcon } from "../icons/DietIcon";
import priceIcon from "../../assets/Cash.png";
import sliceIcon from "../../assets/Pizza.png";

type InfoDisplayProps = {
  peopleAteAvg: PeopleAte;
};

export function InfoDisplay({ peopleAteAvg }: Readonly<InfoDisplayProps>) {
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const { slices } = useSelector(paramsSelector);

  const slicesPerPerson = pizzaSlicesPerPerson(people, pizzas, slices);
  const pricePerPerson = pizzaPricePerPerson(people, pizzas);
  const priceTotal = pizzaPriceTotal(pizzas);

  return (
    <div className="flex w-full">
      {diets.map((diet) => (
        <div
          className="h-full mr-2 w-full"
          key={diet}
          data-testid={`${diet}-flag-container`}
        >
          <div className="text-3xl font-bold mb-2 flex justify-center">
            <DietIcon
              type={diet}
              color="Color"
              className="size-8"
              testId={"flag-container"}
            />
          </div>
          <PizzaFlag
            flagState={stateOfDiet(diet, peopleAteAvg, people)}
            testId={`${diet}-flag`}
          />
        </div>
      ))}
      <div
        className="text-3xl font-bold mr-2 w-full"
        data-testid="price-flag-container"
      >
        <div className="mb-2 flex justify-center">
          <img
            src={priceIcon}
            className="size-8"
            alt="Price"
            data-testid="price-flag-icon"
          />
        </div>
        <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg" data-testid="price-flag-per-person">
            {priceToString(pricePerPerson)}€ / pers
          </span>
          <span className="text-lg" data-testid="price-flag-total">
            {priceToString(priceTotal)}€ total
          </span>
        </div>
      </div>
      <div
        className="text-3xl font-bold w-full"
        data-testid="quantity-flag-container"
      >
        <div className="mb-2 flex justify-center">
          <img
            src={sliceIcon}
            className="size-8"
            alt="Quantity"
            data-testid="quantity-flag-icon"
          />
        </div>
        <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg" data-testid="quantity-flag-slices">
            {slicesPerPerson} slices
          </span>
          <span className="text-lg" data-testid="quantity-flag-pizzas">
            {toUnderstandableRational(slicesPerPerson, slices)} pizzas
          </span>
        </div>
      </div>
    </div>
  );
}
