import { useSelector } from "react-redux";
import { People } from "../../modules/people/slice";
import {
  PeopleAte,
  pizzaPricePerPerson,
  pizzaPriceTotal,
  pizzaSlicesPerPerson,
} from "../../services/calculatorService";
import { Diet, diets } from "../../types";
import { FlagState, PizzaFlag } from "../utils/PizzaFlag";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { paramsSelector } from "../../modules/params/selector";
import { toUnderstandableRational } from "../../services/utils";
import { DietIcon } from "../icons/DietIcon";

type InfoDisplayProps = {
  peopleAteAvg: PeopleAte;
};

export function InfoDisplay({ peopleAteAvg }: InfoDisplayProps) {
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const { slices } = useSelector(paramsSelector);

  const slicesPerPerson = pizzaSlicesPerPerson(people, pizzas, slices);
  const pricePerPerson = pizzaPricePerPerson(people, pizzas);
  const priceTotal = pizzaPriceTotal(pizzas);

  return (
    <div className="flex w-full">
      {diets.map((diet) => (
        <div className="h-full mr-2 w-full" key={diet}>
          <div className="text-3xl font-bold mb-2 flex justify-center">
            <DietIcon type={diet as Diet} color="Color" className="size-8" />
          </div>
          <PizzaFlag
            flagState={stateOfDiet(diet as Diet, peopleAteAvg, people)}
          />
        </div>
      ))}
      <div className="text-3xl font-bold mr-2 w-full">
        <div className="mb-2 flex justify-center">
          <img src="/src/assets/Cash.png" className="size-8" />
        </div>
        <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg">{pricePerPerson}€ / pers</span>
          <span className="text-lg">{priceTotal}€ total</span>
        </div>
      </div>
      <div className="text-3xl font-bold w-full">
        <div className="mb-2 flex justify-center">
          <img src="/src/assets/Pizza.png" className="size-8" />
        </div>
        <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
          <span className="text-lg">{slicesPerPerson} slices</span>
          <span className="text-lg">
            {toUnderstandableRational(slicesPerPerson, slices)} pizzas
          </span>
        </div>
      </div>
    </div>
  );
}

function stateOfDiet(
  diet: Diet,
  peopleAte: PeopleAte,
  people: People
): FlagState {
  if (people[diet] === 0) return "N/A";
  const maxAte = Math.max(
    Math.max(peopleAte.normal, peopleAte.pescoVegetarian),
    Math.max(peopleAte.vegan, peopleAte.vegetarian)
  );
  if (peopleAte[diet] === 0) return "cantEat";
  if (peopleAte[diet] === maxAte) return "perfect";
  if (peopleAte[diet] * 1.5 < maxAte) return "bad";
  if (peopleAte[diet] * 1.25 < maxAte) return "okay";
  if (peopleAte[diet] < maxAte) return "good";
  return "N/A";
}
