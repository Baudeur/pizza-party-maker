import { Info } from "lucide-react";
import { useState } from "react";
import { InfoContent } from "./InfoContent";
import { OverlayWrapper } from "../utils/OverlayWrapper";

export function Infos() {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  return (
    <div>
      <Info
        className="cursor-pointer"
        size={30}
        color="gray"
        strokeWidth={2}
        onClick={() => setDisplayOverlay(true)}
      />
      <OverlayWrapper
        show={displayOverlay}
        close={() => setDisplayOverlay(false)}
      >
        <InfoContent />
      </OverlayWrapper>
    </div>
  );
}
