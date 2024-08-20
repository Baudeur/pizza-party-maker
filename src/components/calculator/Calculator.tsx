import { useSelector } from "react-redux";
import { Container } from "../utils/Container";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import {
  averageCaseScenario,
  bestCaseScenario,
  randomCaseScenario,
  worstCaseScenario,
} from "../../services/calculatorService";
import { InfoDisplay } from "./InfoDisplay";
import { paramsSelector } from "../../modules/params/selector";
import { Params } from "./Params";
import { Expand } from "../utils/Expand";
import { CaseScenario } from "./CaseScenario";

export function Calculator() {
  const pizza = useSelector(pizzasSelector);
  const people = useSelector(peopleSelector);
  const { slices } = useSelector(paramsSelector);

  const peopleAteWorst = worstCaseScenario(slices, pizza, people);
  const peopleAteRandom = randomCaseScenario(slices, pizza, people);
  const peopleAteRandomAvg = averageCaseScenario(slices, pizza, people);
  const peopleAteBest = bestCaseScenario(slices, pizza, people);
  return (
    <Container className="w-full h-fit mt-4">
      <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
      <Expand label="Details" heigth="h-36" className="mt-4 cursor-default">
        <CaseScenario label="Worst case scenario" peopleAte={peopleAteWorst} />
        <CaseScenario
          label="Random case scenario"
          peopleAte={peopleAteRandom}
        />
        <CaseScenario
          label="Average case scenario"
          peopleAte={peopleAteRandomAvg}
        />
        <CaseScenario label="Best case scenario" peopleAte={peopleAteBest} />
      </Expand>
      <Expand label="Parameters" heigth="h-16" className="mt-2">
        <Params />
      </Expand>
    </Container>
  );
}
