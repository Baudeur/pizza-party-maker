import { PropsWithChildren } from "react";
import { Overlay } from "./Overlay";

type OverlayWrapper = {
  show: boolean;
  title: string;
  close: () => void;
  testId?: string;
};

export function OverlayWrapper({
  show,
  close,
  title,
  children,
  testId,
}: PropsWithChildren<OverlayWrapper>) {
  return (
    <div>
      {show && (
        <Overlay title={title} close={close} testId={testId}>
          {children}
        </Overlay>
      )}
    </div>
  );
}
