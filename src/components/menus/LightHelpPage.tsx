import { useLayoutEffect } from "react";
import { LightAboutOverlayContent } from "../light-page/LightAboutOverlayContent";

export function LightHelpPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="px-4 bg-amber-100 h-full">
      <LightAboutOverlayContent />
    </div>
  );
}
