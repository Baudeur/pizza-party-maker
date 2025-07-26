import { CircleHelp } from "lucide-react";
import { CaseScenario } from "./CaseScenario";
import { useTranslation } from "react-i18next";
import { PeopleAte } from "../../services/calculatorService";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { openOverlay } from "../../modules/overlays/slice";
import { useContext } from "react";
import { CloseContext } from "../utils/OverlayInside";

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
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const animateAndClose = useContext(CloseContext);

  return (
    <div className="w-full">
      <div className="relative flex justify-end pr-2">
        <button
          className="absolute"
          onClick={() => {
            if (isDesktop) {
              dispatch(openOverlay({ id: "DETAIL_INFO" }));
            } else {
              navigate("/help-details");
              animateAndClose();
            }
          }}
          data-testid="details-overlay-button"
          title={t("help")}
        >
          <CircleHelp
            size={25}
            color="black"
            strokeWidth={2}
            className="hover:fill-amber-200 hover:stroke-amber-700"
          />
        </button>
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
