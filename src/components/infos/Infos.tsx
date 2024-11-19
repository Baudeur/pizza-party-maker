import { Info } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { LanguageSelector } from "./LanguageSelector";

export function Infos() {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  return (
    <div className="flex items-center">
      <LanguageSelector />
      <button
        onClick={() => setDisplayOverlay(true)}
        data-testid="info-overlay-button"
        className="ml-2"
      >
        <Info size={30} color="gray" strokeWidth={2} />
      </button>
      <OverlayWrapper
        show={displayOverlay}
        close={() => setDisplayOverlay(false)}
        testId="info-overlay"
      >
        <InfoContent />
      </OverlayWrapper>
    </div>
  );
}
