import { CircleHelp, Settings, Star } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop } from "../utils/ReactiveComponents";
import { useAppDispatch } from "../../hooks";
import { openOverlay } from "../../modules/overlays/slice";
import { Link } from "react-router-dom";

export function Infos() {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <div className={`${isDesktop ? "flex gap-2" : "m-2"}`}>
      <div>
        <LanguageSelector />
      </div>
      <Desktop>
        <Link to="/" title={t("go-light-ver")}>
          <Star
            size={30}
            color="gray"
            strokeWidth={2}
            className="hover:fill-amber-300 hover:stroke-amber-700"
          />
        </Link>
        <div>
          <button
            onClick={() => dispatch(openOverlay({ id: "PARAM" }))}
            data-testid="param-overlay-button"
            title={t("parameters-title")}
          >
            <Settings
              size={30}
              color="gray"
              strokeWidth={2}
              className="hover:fill-amber-300 hover:stroke-amber-700"
            />
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(openOverlay({ id: "INFO" }))}
            data-testid="info-overlay-button"
            title={t("help")}
          >
            <CircleHelp
              size={30}
              color="gray"
              strokeWidth={2}
              className="hover:fill-amber-300 hover:stroke-amber-700"
            />
          </button>
        </div>
      </Desktop>
    </div>
  );
}
