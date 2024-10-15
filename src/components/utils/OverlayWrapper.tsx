import { PropsWithChildren } from "react";
import { Overlay } from "./Overlay";

type OverlayWrapper = {
  show: boolean;
  close: () => void;
};

export function OverlayWrapper({
  show,
  close,
  children,
}: PropsWithChildren<OverlayWrapper>) {
  return <div>{show && <Overlay close={close}>{children}</Overlay>}</div>;
}
