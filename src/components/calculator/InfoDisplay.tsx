import { useSelector } from "react-redux";
import { People } from "../../modules/people/slice";
import {
  PeopleAte,
  pizzaPricePerPerson,
  pizzaSlicesPerPerson,
} from "../../services/calculatorService";
import { Diet } from "../../types";
import { FlagState, PizzaFlag } from "../utils/PizzaFlag";
import { peopleSelector } from "../../modules/people/selector";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { paramsSelector } from "../../modules/params/selector";
import { toUnderstandableRational } from "../../services/utils";

type InfoDisplayProps = {
  peopleAteAvg: PeopleAte;
};

export function InfoDisplay({ peopleAteAvg }: InfoDisplayProps) {
  const people = useSelector(peopleSelector);
  const pizzas = useSelector(pizzasSelector);
  const { slices } = useSelector(paramsSelector);

  const slicesPerPerson = pizzaSlicesPerPerson(people, pizzas, slices);
  const pricePerPerson = pizzaPricePerPerson(people, pizzas);

  return (
    <div className="flex w-full">
      {[
        { label: "🍗", diet: "normal" },
        { label: "🐟", diet: "pescoVegetarian" },
        { label: "🧀", diet: "vegetarian" },
        { label: "🥕", diet: "vegan" },
      ].map((obj) => (
        <div className="h-full mr-2 w-full" key={obj.diet}>
          <span className="text-3xl font-bold">{obj.label}</span>
          <PizzaFlag
            flagState={stateOfDiet(obj.diet as Diet, peopleAteAvg, people)}
          />
        </div>
      ))}
      <div className="text-3xl font-bold mr-2 w-full">
        <span>💵</span>
        <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex items-center justify-center">
          <span className="text-2xl">{pricePerPerson}€</span>
        </div>
      </div>
      <div className="text-3xl font-bold w-full">
        <span>🍕</span>
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
  if (people[diet] == 0) return "N/A";
  const maxAte = Math.max(
    Math.max(peopleAte.normal, peopleAte.pescoVegetarian),
    Math.max(peopleAte.vegan, peopleAte.vegetarian)
  );
  if (peopleAte[diet] == 0) return "cantEat";
  if (peopleAte[diet] == maxAte) return "perfect";
  if (peopleAte[diet] * 1.5 < maxAte) return "bad";
  if (peopleAte[diet] * 1.25 < maxAte) return "okay";
  if (peopleAte[diet] < maxAte) return "good";
  return "N/A";
}
