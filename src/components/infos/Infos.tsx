import { CircleHelp, Settings } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { Overlay } from "../utils/Overlay";
import { Params } from "./Params";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop } from "../utils/ReactiveComponents";

export function Infos() {
  const [displayOverlay1, setDisplayOverlay1] = useState(false);
  const [displayOverlay2, setDisplayOverlay2] = useState(false);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const { t } = useTranslation();
  return (
    <div className={`${isDesktop ? "flex gap-2" : "m-2"}`}>
      <div>
        <LanguageSelector />
      </div>
      <Desktop>
        <div>
          <button
            onClick={() => setDisplayOverlay2(true)}
            data-testid="param-overlay-button"
            title={t("parameters-title")}
          >
            <Settings size={30} color="gray" strokeWidth={2} />
          </button>
          <Overlay
            show={displayOverlay2}
            title={t("parameters-title")}
            close={() => setDisplayOverlay2(false)}
            testId="param-overlay"
          >
            <Params />
          </Overlay>
        </div>
        <div>
          <button
            onClick={() => setDisplayOverlay1(true)}
            data-testid="info-overlay-button"
            title={t("help")}
          >
            <CircleHelp size={30} color="gray" strokeWidth={2} />
          </button>
          <Overlay
            show={displayOverlay1}
            title={t("help")}
            close={() => setDisplayOverlay1(false)}
            testId="info-overlay"
          >
            <InfoContent />
          </Overlay>
        </div>
      </Desktop>
    </div>
  );
}
