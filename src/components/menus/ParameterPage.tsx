import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Params } from "../infos/Params";

export function ParameterPage() {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
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
    <div className="p-4 bg-amber-100 h-[calc(100vh-48px)]">
      <Params />
    </div>
  );
}
