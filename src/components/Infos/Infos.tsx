import { Info } from "lucide-react";
import { InfoOverlay } from "./InfoOverlay";
import { useState } from "react";

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
      <InfoOverlay
        show={displayOverlay}
        close={() => setDisplayOverlay(false)}
      />
    </div>
  );
}
