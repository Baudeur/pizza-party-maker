import { Overlay } from "../utils/Overlay";
import { useTranslation } from "react-i18next";
import { SuggestOverlayContent } from "../suggester/SuggestOverlayContent";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { CaseScenarioOverlayContent } from "../calculator/CaseScenarioOverlayContent";
import { Params } from "../infos/Params";
import { InfoContent } from "../infos/InfoContent";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { SaveAsPizzeriaOverlayContent } from "../pizzeria/SaveAsPizzeriaOverlayContent";
import { ManagePizzeriaOverlayContent } from "../pizzeria/ManagePizzeriaOverlayContent";
import { MobileDetailsOverlayContent } from "./MobileDetailsOverlayContent";
import { TooltipOverlay } from "../utils/TooltipOverlay";
import { LightAboutOverlayContent } from "../light-page/LightAboutOverlayContent";
import { LightWarningConfirmOverlay } from "../light-page/LightWarningConfirmOverlay";

export function Overlays() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  return (
    <>
      <TooltipOverlay />
      <Overlay
        overlayId="SUGGESTER"
        title={t("suggester-popup-title")}
        testId="suggester-overlay"
      >
        <SuggestOverlayContent />
      </Overlay>
      <Overlay
        overlayId="LIGHT_ABOUT"
        title={t("light-about")}
        testId="light-about"
      >
        <LightAboutOverlayContent />
      </Overlay>
      <Overlay
        overlayId="SAVE_PIZZERIA"
        title={
          isDesktop
            ? t("save-pizzeria-as-title")
            : t("save-pizzeria-as-title-short")
        }
        testId="save-as-overlay"
      >
        <SaveAsPizzeriaOverlayContent />
      </Overlay>
      <Overlay
        overlayId="MANAGE_PIZZERIA"
        title={
          isDesktop
            ? t("manage-pizzeria-title")
            : t("manage-pizzeria-title-short")
        }
        testId="manage-overlay"
      >
        <ManagePizzeriaOverlayContent />
      </Overlay>
      <Desktop>
        <Overlay
          overlayId="DETAIL_INFO"
          title={t("help")}
          testId="details-overlay"
        >
          <CaseScenarioOverlayContent />
        </Overlay>
        <Overlay overlayId="INFO" title={t("help")} testId="info-overlay">
          <InfoContent />
        </Overlay>
        <Overlay
          overlayId="PARAM"
          title={t("parameters-title")}
          testId="param-overlay"
        >
          <Params />
        </Overlay>
      </Desktop>
      <Mobile>
        <Overlay
          overlayId={"DETAILS"}
          title={t("details-and-graphs")}
          testId="suggester-overlay"
        >
          <MobileDetailsOverlayContent />
        </Overlay>
        <Overlay
          overlayId="LIGHT_WARNING"
          title={t("light-warning")}
          testId="warning-confirm-overlay"
        >
          <LightWarningConfirmOverlay />
        </Overlay>
      </Mobile>
    </>
  );
}
