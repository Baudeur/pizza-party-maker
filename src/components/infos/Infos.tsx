import { Info } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { OverlayWrapper } from "../utils/OverlayWrapper";

export function Infos() {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  return (
    <div>
      <button
        onClick={() => setDisplayOverlay(true)}
        data-testid="info-overlay-button"
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
