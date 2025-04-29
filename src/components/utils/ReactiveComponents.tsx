import React, { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

export function Desktop({ children }: PropsWithChildren) {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  return isDesktop ? children : null;
}

export function Mobile({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery({ maxDeviceWidth: desktopSize });
  return isMobile ? children : null;
}

export function EitherDesktopOrMobile({ children }: PropsWithChildren) {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  if (isDesktop) {
    return children ? React.Children.toArray(children)[0] : null;
  } else {
    return children ? React.Children.toArray(children)[1] : null;
  }
}
