import { CircleHelp, Settings } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { Params } from "../calculator/Params";

export function Infos() {
  const [displayOverlay1, setDisplayOverlay1] = useState(false);
  const [displayOverlay2, setDisplayOverlay2] = useState(false);
  return (
    <div className="flex gap-2">
      <div>
        <button
          onClick={() => setDisplayOverlay2(true)}
          data-testid="param-overlay-button"
          title="Parameters"
        >
          <Settings size={30} color="gray" strokeWidth={2} />
        </button>
        <OverlayWrapper
          show={displayOverlay2}
          close={() => setDisplayOverlay2(false)}
          testId="param-overlay"
        >
          <Params />
        </OverlayWrapper>
      </div>
      <div>
        <button
          onClick={() => setDisplayOverlay1(true)}
          data-testid="info-overlay-button"
          title="Help"
        >
          <CircleHelp size={30} color="gray" strokeWidth={2} />
        </button>
        <OverlayWrapper
          show={displayOverlay1}
          close={() => setDisplayOverlay1(false)}
          testId="info-overlay"
        >
          <InfoContent />
        </OverlayWrapper>
      </div>
    </div>
  );
}
