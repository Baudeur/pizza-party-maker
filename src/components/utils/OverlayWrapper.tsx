import { PropsWithChildren } from "react";
import { Overlay } from "./Overlay";

type OverlayWrapper = {
  show: boolean;
  close: () => void;
  testId?: string;
};

export function OverlayWrapper({
  show,
  close,
  children,
  testId,
}: PropsWithChildren<OverlayWrapper>) {
  return (
    <div>
      {show && (
        <Overlay close={close} testId={testId}>
          {children}
        </Overlay>
      )}
    </div>
  );
}
