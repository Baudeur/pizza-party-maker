import { Overlay } from "../utils/Overlay";
import { useTranslation } from "react-i18next";
import { TooltipOverlay } from "../utils/TooltipOverlay";
import { LightAboutOverlayContent } from "../light-page/LightAboutOverlayContent";
import { LightWarningConfirmOverlay } from "../light-page/LightWarningConfirmOverlay";

export function Overlays() {
  const { t } = useTranslation();

  return (
    <>
      <TooltipOverlay />
      <Overlay
        overlayId="LIGHT_ABOUT"
        title={t("light-about")}
        testId="light-about"
      >
        <LightAboutOverlayContent />
      </Overlay>
      <Overlay
        overlayId="LIGHT_WARNING"
        title={t("light-warning")}
        testId="light-warning-overlay"
      >
        <LightWarningConfirmOverlay />
      </Overlay>
    </>
  );
}
