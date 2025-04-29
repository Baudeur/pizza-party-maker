import { CircleHelp } from "lucide-react";
import { CaseScenario } from "./CaseScenario";
import { useTranslation } from "react-i18next";
import { PeopleAte } from "../../services/calculatorService";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { useState } from "react";
import { CaseScenarioOverlayContent } from "./CaseScenarioOverlayContent";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { useNavigate } from "react-router-dom";

type DetailsProps = {
  worstCaseScenario: PeopleAte;
  randomCaseScenario: PeopleAte;
  averageCaseScenario: PeopleAte;
  bestCaseScenario: PeopleAte;
};

export function Details({
  worstCaseScenario,
  randomCaseScenario,
  averageCaseScenario,
  bestCaseScenario,
}: DetailsProps) {
  const { t } = useTranslation();
  const [showDetailsExplanation, setShowDetailsExplanation] = useState(false);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="relative flex justify-end pr-2">
        <button
          className="absolute"
          onClick={() => {
            setShowDetailsExplanation(true);
          }}
          data-testid="details-overlay-button"
          title={t("help")}
        >
          <CircleHelp
            size={25}
            color="black"
            strokeWidth={2}
            onClick={() => {
              if (isDesktop) {
                setShowDetailsExplanation(true);
              } else {
                navigate("/help-details");
              }
            }}
          />
        </button>
        {isDesktop && (
          <OverlayWrapper
            show={showDetailsExplanation}
            title={t("help")}
            close={() => setShowDetailsExplanation(false)}
            testId="details-overlay"
          >
            <CaseScenarioOverlayContent />
          </OverlayWrapper>
        )}
      </div>
      <CaseScenario
        label={t("details-worst-case-scenario")}
        peopleAte={worstCaseScenario}
        testId="worst-case"
      />
      <CaseScenario
        label={t("details-random-case-scenario")}
        peopleAte={randomCaseScenario}
        testId="random-case"
      />
      <CaseScenario
        label={t("details-average-case-scenario")}
        peopleAte={averageCaseScenario}
        testId="average-case"
      />
      <CaseScenario
        label={t("details-best-case-scenario")}
        peopleAte={bestCaseScenario}
        testId="best-case"
      />
    </div>
  );
}
