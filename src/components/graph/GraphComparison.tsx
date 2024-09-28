import { useSelector } from "react-redux";
import { pizzaQuantitySelector } from "../../modules/pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import { pizzaQuantityEquality } from "../../services/utils";
import { Squares } from "./Squares";
import { SquaresSVG } from "./SquaresSVG";

export function GraphComparison() {
  const pizza = useSelector(pizzaQuantitySelector, pizzaQuantityEquality);
  const people = useSelector(peopleSelector);
  const pizzasCounts = {
    normal: pizza.find((pz) => pz.eatenBy === "normal")?.quantity ?? 0,
    pescoVegetarian:
      pizza.find((pz) => pz.eatenBy === "pescoVegetarian")?.quantity ?? 0,
    vegetarian: pizza.find((pz) => pz.eatenBy === "vegetarian")?.quantity ?? 0,
    vegan: pizza.find((pz) => pz.eatenBy === "vegan")?.quantity ?? 0,
  };
  return (
    <div className="flex flex-col justify-start gap-2 my-2">
      <div className="flex items-center">
        <div className="font-bold w-20">People</div>
        <SquaresSVG proportions={people} width={300} height={40} />
      </div>
      <div className="flex items-center">
        <div className="font-bold w-20">Pizza</div>
        <SquaresSVG proportions={pizzasCounts} width={300} height={40} />
      </div>
    </div>
  );
}
