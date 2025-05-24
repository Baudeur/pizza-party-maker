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
import { pizzaQuantityEquality } from "../../services/utils";
import { useMemo, useState } from "react";
import { GraphComparison } from "../graph/GraphComparison";
import { Button } from "../utils/Button";
import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { Swipable } from "../utils/Swipable";
import { Details } from "./Details";
import { useAppDispatch } from "../../hooks";
import { openOverlay } from "../../modules/overlays/slice";

const EXTENDED_SIZE = 250;
const RETRACTED_SIZE = 112;

export function Calculator() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [extendValue, setExtendValue] = useState([0, 0]);
  const [extended, setExtended] = useState(false);

  const pizza = useSelector(pizzaQuantitySelector, pizzaQuantityEquality);
  const people = useSelector(peopleSelector);
  const slices = useSelector(sliceSelector);

  const extendPosition = Math.min(
    Math.max(
      (extended ? EXTENDED_SIZE : RETRACTED_SIZE) - extendValue[0],
      RETRACTED_SIZE
    ),
    EXTENDED_SIZE
  );

  const extendPercentage =
    (extendPosition - RETRACTED_SIZE) / (EXTENDED_SIZE - RETRACTED_SIZE);

  const peopleAteWorst = useMemo(
    () => worstCaseScenario(slices, pizza, people),
    [slices, pizza, people]
  );
  const peopleAteRandom = useMemo(
    () => randomCaseScenario(slices, pizza, people),
    [slices, pizza, people]
  );
  const peopleAteRandomAvg = useMemo(
    () => averageCaseScenario(100, slices, pizza, people),
    [slices, pizza, people]
  );
  const peopleAteBest = useMemo(
    () => bestCaseScenario(slices, pizza, people),
    [slices, pizza, people]
  );

  return (
    <>
      <EitherDesktopOrMobile>
        <Container styleClassName="w-full h-fit">
          <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
          <Button
            color="green"
            onClick={() => {
              dispatch(openOverlay("SUGGESTER"));
            }}
            className="mt-2 font-bold w-full rounded-lg"
            testId="suggester-button"
            title={t("suggester-open-button")}
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
            <Details
              worstCaseScenario={peopleAteWorst}
              randomCaseScenario={peopleAteRandom}
              averageCaseScenario={peopleAteRandomAvg}
              bestCaseScenario={peopleAteBest}
            />
          </Expand>
        </Container>
        <div className="sticky mt-auto bottom-0 w-full z-[15] shadow-[0_-10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)]">
          <Swipable
            onSwipeFinish={() => {
              setExtendValue([0, 0]);
              if (extended) {
                if (
                  extendPosition <
                    RETRACTED_SIZE + (EXTENDED_SIZE - RETRACTED_SIZE) / 2 ||
                  extendValue[0] - extendValue[1] > 10
                ) {
                  setExtended(false);
                }
              } else {
                if (
                  extendPosition >
                    RETRACTED_SIZE + (EXTENDED_SIZE - RETRACTED_SIZE) / 2 ||
                  extendValue[0] - extendValue[1] < -10
                ) {
                  setExtended(true);
                }
              }
            }}
            onSwipeMove={(value) => {
              setExtendValue((prev) => [value, prev[0]]);
            }}
            vertical={true}
            noMovement={true}
          >
            <div
              style={{
                height: `${extendPosition}px`,
              }}
              className={`overflow-hidden ${
                extendValue[0] === 0 &&
                extendValue[1] === 0 &&
                "transition-all duration-100"
              }`}
            >
              <Container
                layoutClassName="h-full w-full"
                styleClassName="rounded-none border-x-0 border-b-0"
              >
                <div className="w-full flex justify-center">
                  <div className="rounded mb-2 w-32 -mt-2 bg-gray-400 h-[3px]"></div>
                </div>
                <div className="relative">
                  <div
                    className="absolute w-full"
                    style={{ opacity: 1 - extendPercentage }}
                  >
                    <InfoDisplay peopleAteAvg={peopleAteRandomAvg} />
                  </div>
                  <div
                    className="absolute w-full"
                    style={{ opacity: extendPercentage }}
                  >
                    <InfoDisplay
                      peopleAteAvg={peopleAteRandomAvg}
                      mobileExtended={true}
                    />
                    <Button
                      color="green"
                      onClick={() => {
                        dispatch(openOverlay("SUGGESTER"));
                      }}
                      className="font-bold w-full rounded-lg mt-2"
                      testId="suggester-button"
                      title={t("suggester-open-button")}
                    >
                      {t("suggester-open-button")}
                    </Button>
                    <Button
                      color="orange"
                      onClick={() => {
                        dispatch(openOverlay("DETAILS"));
                      }}
                      className="font-bold w-full rounded-lg mt-2"
                      testId="suggester-button"
                      title={t("details-and-graphs")}
                    >
                      {t("details-and-graphs")}
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          </Swipable>
        </div>
      </EitherDesktopOrMobile>
    </>
  );
}
