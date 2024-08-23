import { Info } from "lucide-react";
import { useState } from "react";
import { Overlay } from "../utils/Overlay";
import { InfoContent } from "./InfoContent";

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
      <Overlay show={displayOverlay} close={() => setDisplayOverlay(false)}>
        <InfoContent />
      </Overlay>
    </div>
  );
}
