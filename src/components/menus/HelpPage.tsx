import { useEffect, useLayoutEffect } from "react";
import { InfoContent } from "../infos/InfoContent";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

export function HelpPage() {
  const isDesktop = useMediaQuery({ minWidth: desktopSize });
  const navigate = useNavigate();

  useEffect(() => {
    addEventListener("popstate", (e) => {
      navigate("/");
      e.preventDefault();
      e.stopPropagation();
    });
  });

  useLayoutEffect(() => {
    if (isDesktop) {
      navigate("/");
    }
  });
  return (
    <div className="p-4 bg-amber-100 h-full">
      <InfoContent />
    </div>
  );
}
