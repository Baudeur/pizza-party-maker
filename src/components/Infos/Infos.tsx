import { Info } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { SuggestOverlayContent } from "../suggester/SuggestOverlayContent";
import { OverlayWrapper } from "../utils/OverlayWrapper";

export function Infos() {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const [displayOverlay2, setDisplayOverlay2] = useState(false);
  return (
    <div>
      <Info
        className="cursor-pointer"
        size={30}
        color="gray"
        strokeWidth={2}
        onClick={() => setDisplayOverlay(true)}
      />
      <Info
        className="cursor-pointer"
        size={30}
        color="red"
        strokeWidth={2}
        onClick={() => setDisplayOverlay2(true)}
      />
      <OverlayWrapper
        show={displayOverlay}
        close={() => setDisplayOverlay(false)}
      >
        <InfoContent />
      </OverlayWrapper>
      <OverlayWrapper
        show={displayOverlay2}
        close={() => setDisplayOverlay2(false)}
      >
        <SuggestOverlayContent />
      </OverlayWrapper>
    </div>
  );
}
