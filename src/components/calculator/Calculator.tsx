import { useSelector } from "react-redux";
import { Container } from "../utils/Container";
import { pizzaQuantitySelector } from "../../modules/pizzas/selector";
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
import { pizzaQuantityEquality } from "../../services/utils";
import { Info } from "lucide-react";
import { Overlay } from "../utils/Overlay";
import { useState } from "react";
import { CaseScenarioOverlayContent } from "./CaseScenarioOverlayContent";
import { GraphComparison } from "../graph/GraphComparison";

export function Calculator() {
  const [showOverlay, setShowOverlay] = useState(false);
  const pizza = useSelector(pizzaQuantitySelector, pizzaQuantityEquality);
  const people = useSelector(peopleSelector);
  const { slices } = useSelector(paramsSelector);

  const peopleAteWorst = worstCaseScenario(slices, pizza, people);
  const peopleAteRandom = randomCaseScenario(slices, pizza, people);
  const peopleAteRandomAvg = averageCaseScenario(slices, pizza, people);
  const peopleAteBest = bestCaseScenario(slices, pizza, people);
  return (
    <Container className="w-full h-fit mt-4">
      <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
      <Expand label="Graphs" heigth="h-[110px]" className="mt-4">
        <GraphComparison />
      </Expand>
      <Expand label="Details" heigth="h-36" className="mt-2 cursor-default">
        <div className="relative flex justify-end pr-2">
          <Info
            className="cursor-pointer absolute"
            size={25}
            color="black"
            strokeWidth={2}
            onClick={() => {
              setShowOverlay(true);
            }}
          />
          <Overlay show={showOverlay} close={() => setShowOverlay(false)}>
            <CaseScenarioOverlayContent />
          </Overlay>
        </div>
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
      <Expand label="Parameters" heigth="h-10" className="mt-2">
        <Params />
      </Expand>
    </Container>
  );
}
