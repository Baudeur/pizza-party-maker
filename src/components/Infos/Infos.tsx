import { Info } from "lucide-react";
import { useState } from "react";
import { Overlay } from "../utils/Overlay";
import { InfoContent } from "./InfoContent";
import { SuggestOverlayContent } from "../suggester/SuggestOverlayContent";

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
      <Overlay show={displayOverlay} close={() => setDisplayOverlay(false)}>
        <InfoContent />
      </Overlay>
      <Overlay show={displayOverlay2} close={() => setDisplayOverlay2(false)}>
        <SuggestOverlayContent />
      </Overlay>
    </div>
  );
}
