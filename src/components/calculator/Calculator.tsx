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
import { sliceSelector } from "../../modules/params/selector";
import { Params } from "./Params";
import { Expand } from "../utils/Expand";
import { CaseScenario } from "./CaseScenario";
import { pizzaQuantityEquality } from "../../services/utils";
import { Info } from "lucide-react";
import { useState } from "react";
import { CaseScenarioOverlayContent } from "./CaseScenarioOverlayContent";
import { GraphComparison } from "../graph/GraphComparison";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { Button } from "../utils/Button";
import { SuggestOverlayContent } from "../suggester/SuggestOverlayContent";

export function Calculator() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [displayOverlay, setDisplayOverlay] = useState(false);

  const pizza = useSelector(pizzaQuantitySelector, pizzaQuantityEquality);
  const people = useSelector(peopleSelector);
  const slices = useSelector(sliceSelector);

  const peopleAteWorst = worstCaseScenario(slices, pizza, people);
  const peopleAteRandom = randomCaseScenario(slices, pizza, people);
  const peopleAteRandomAvg = averageCaseScenario(100, slices, pizza, people);
  const peopleAteBest = bestCaseScenario(slices, pizza, people);
  return (
    <Container className="w-full h-fit mt-4">
      <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
      <Button
        color="green"
        onClick={() => {
          setDisplayOverlay(true);
        }}
        className="mt-2 font-bold w-full rounded-lg"
        testId="suggester-button"
      >
        Struggling to find the right proportions ? Click here
      </Button>
      <Expand
        label="Graphs"
        heigth="h-[110px]"
        className="mt-4"
        testId="graph-expand"
      >
        <GraphComparison />
      </Expand>
      <Expand
        label="Details"
        heigth="h-36"
        className="mt-2 cursor-default"
        testId="details-expand"
      >
        <div className="relative flex justify-end pr-2">
          <button
            className="absolute"
            onClick={() => {
              setShowOverlay(true);
            }}
            data-testid="details-overlay-button"
          >
            <Info
              size={25}
              color="black"
              strokeWidth={2}
              onClick={() => {
                setShowOverlay(true);
              }}
            />
          </button>
          <OverlayWrapper
            show={showOverlay}
            close={() => setShowOverlay(false)}
            testId="details-overlay"
          >
            <CaseScenarioOverlayContent />
          </OverlayWrapper>
        </div>
        <CaseScenario
          label="Worst case scenario"
          peopleAte={peopleAteWorst}
          testId="worst-case"
        />
        <CaseScenario
          label="Random case scenario"
          peopleAte={peopleAteRandom}
          testId="random-case"
        />
        <CaseScenario
          label="Average case scenario"
          peopleAte={peopleAteRandomAvg}
          testId="average-case"
        />
        <CaseScenario
          label="Best case scenario"
          peopleAte={peopleAteBest}
          testId="best-case"
        />
      </Expand>
      <Expand
        label="Parameters"
        heigth="h-32"
        className="mt-2"
        testId="parameters-expand"
      >
        <Params />
      </Expand>
      <OverlayWrapper
        show={displayOverlay}
        close={() => setDisplayOverlay(false)}
        testId="suggester-overlay"
      >
        <SuggestOverlayContent close={() => setDisplayOverlay(false)} />
      </OverlayWrapper>
    </Container>
  );
}
