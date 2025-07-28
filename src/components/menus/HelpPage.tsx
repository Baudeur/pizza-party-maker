import { useEffect, useLayoutEffect } from "react";
import { InfoContent } from "../infos/InfoContent";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

export function HelpPage() {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const navigate = useNavigate();

  useEffect(() => {
    addEventListener("popstate", (e) => {
      navigate("/old");
      e.preventDefault();
      e.stopPropagation();
    });
  });

  useLayoutEffect(() => {
    if (isDesktop) {
      navigate("/old");
    }
    window.scrollTo(0, 0);
  });
  return (
    <div className="px-4 bg-amber-100 h-full">
      <InfoContent />
    </div>
  );
}
