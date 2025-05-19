import { PropsWithChildren } from "react";
import { OverlayInside } from "./OverlayInside";

type OverlayWrapper = {
  show: boolean;
  title: string;
  close: () => void;
  testId?: string;
};

export function Overlay({
  show,
  close,
  title,
  children,
  testId,
}: PropsWithChildren<OverlayWrapper>) {
  return (
    <div>
      {show && (
        <OverlayInside title={title} close={close} testId={testId}>
          {children}
        </OverlayInside>
      )}
    </div>
  );
}
