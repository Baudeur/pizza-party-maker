import { useSelector } from "react-redux";
import { Details } from "../calculator/Details";
import { GraphComparison } from "../graph/GraphComparison";
import { peopleSelector } from "../../modules/people/selector";
import { pizzaQuantitySelector } from "../../modules/pizzas/selector";
import { pizzaQuantityEquality } from "../../services/utils";
import { sliceSelector } from "../../modules/params/selector";
import {
  averageCaseScenario,
  bestCaseScenario,
  randomCaseScenario,
  worstCaseScenario,
} from "../../services/calculatorService";

export function MobileDetailsOverlayContent() {
  const pizza = useSelector(pizzaQuantitySelector, pizzaQuantityEquality);
  const people = useSelector(peopleSelector);
  const slices = useSelector(sliceSelector);

  const peopleAteWorst = worstCaseScenario(slices, pizza, people);
  const peopleAteRandom = randomCaseScenario(slices, pizza, people);
  const peopleAteRandomAvg = averageCaseScenario(100, slices, pizza, people);
  const peopleAteBest = bestCaseScenario(slices, pizza, people);
  return (
    <div className="max-h-[70dvh] overflow-y-auto">
      <Details
        worstCaseScenario={peopleAteWorst}
        randomCaseScenario={peopleAteRandom}
        averageCaseScenario={peopleAteRandomAvg}
        bestCaseScenario={peopleAteBest}
      />
      <GraphComparison />
    </div>
  );
}
