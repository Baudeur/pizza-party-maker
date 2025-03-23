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
import { Expand } from "../utils/Expand";
import { CaseScenario } from "./CaseScenario";
import { pizzaQuantityEquality } from "../../services/utils";
import { ArrowUp, CircleHelp } from "lucide-react";
import { useState } from "react";
import { CaseScenarioOverlayContent } from "./CaseScenarioOverlayContent";
import { GraphComparison } from "../graph/GraphComparison";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { Button } from "../utils/Button";
import { SuggestOverlayContent } from "../suggester/SuggestOverlayContent";
import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";

export function Calculator() {
  const { t } = useTranslation();
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
    <EitherDesktopOrMobile>
      <Container className="w-full h-fit">
        <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
        <Button
          color="green"
          onClick={() => {
            setDisplayOverlay(true);
          }}
          className="mt-2 font-bold w-full rounded-lg"
          testId="suggester-button"
          title="Open suggester"
        >
          {t("suggester-open-button")}
        </Button>
        <Expand
          label={t("graphs-expand-title")}
          heigth="h-[110px]"
          className="mt-4"
          testId="graph-expand"
        >
          <GraphComparison />
        </Expand>
        <Expand
          label={t("details-expand-title")}
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
              title="Help"
            >
              <CircleHelp
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
            label={t("details-worst-case-scenario")}
            peopleAte={peopleAteWorst}
            testId="worst-case"
          />
          <CaseScenario
            label={t("details-random-case-scenario")}
            peopleAte={peopleAteRandom}
            testId="random-case"
          />
          <CaseScenario
            label={t("details-average-case-scenario")}
            peopleAte={peopleAteRandomAvg}
            testId="average-case"
          />
          <CaseScenario
            label={t("details-best-case-scenario")}
            peopleAte={peopleAteBest}
            testId="best-case"
          />
        </Expand>
        <OverlayWrapper
          show={displayOverlay}
          close={() => setDisplayOverlay(false)}
          testId="suggester-overlay"
        >
          <SuggestOverlayContent close={() => setDisplayOverlay(false)} />
        </OverlayWrapper>
      </Container>
      <div className="fixed bottom-0 w-full z-10">
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {}}
            color="green"
            className="rounded-t-lg w-8 mr-2"
          >
            <ArrowUp color="white" />
          </Button>
        </div>

        <Container className="h-28 rounded-none border-x-0 border-b-0 w-full">
          <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
        </Container>
      </div>
    </EitherDesktopOrMobile>
  );
}
