import { PropsWithChildren } from "react";
import { OverlayInside } from "./OverlayInside";
import { OverlayId } from "../../modules/overlays/slice";
import { useSelector } from "react-redux";
import { openedOverlaySelector } from "../../modules/overlays/selector";

type OverlayWrapper = {
  overlayId: OverlayId;
  title: string;
  testId?: string;
};

export function Overlay({
  overlayId,
  title,
  children,
  testId,
}: PropsWithChildren<OverlayWrapper>) {
  const openedOverlay = useSelector(openedOverlaySelector);
  return (
    <div>
      {openedOverlay === overlayId && (
        <OverlayInside title={title} testId={testId}>
          {children}
        </OverlayInside>
      )}
    </div>
  );
}
