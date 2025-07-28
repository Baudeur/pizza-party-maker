import { useSelector } from "react-redux";
import {
  tooltipContentSelector,
  tooltipCoordsSelector,
} from "../../modules/overlays/selector";
import { useLayoutEffect, useRef, useState } from "react";
import { Rect } from "../../types";

export function TooltipOverlay() {
  const content = useSelector(tooltipContentSelector);
  const coords = useSelector(tooltipCoordsSelector);
  const [isOutOfBoundsX, setIsOutOfBoundsX] = useState<"L" | "R" | undefined>(
    undefined
  );
  const [isOutOfBoundsY, setIsOutOfBoundsY] = useState<"T" | "B" | undefined>(
    undefined
  );
  const [bounding, setBounding] = useState<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bounding = ref.current?.getBoundingClientRect();
    if (bounding) setBounding(bounding);
    if (bounding === undefined) {
      setIsOutOfBoundsX(undefined);
      setIsOutOfBoundsY(undefined);
    } else {
      const tooFarRight = bounding.x + bounding.width > window.innerWidth;
      const tooFarLeft = bounding.x < 0;
      const tooFarDown = bounding.y + bounding.height > window.innerHeight;
      const tooFarUp = bounding.y < 0;
      setIsOutOfBoundsX(tooFarRight ? "R" : tooFarLeft ? "L" : isOutOfBoundsX);
      setIsOutOfBoundsY(tooFarUp ? "T" : tooFarDown ? "B" : isOutOfBoundsY);
    }
  }, [ref, content]);

  return (
    <>
      {content != undefined && (
        <div
          ref={ref}
          className="fixed z-50"
          style={{
            left:
              isOutOfBoundsX === "L"
                ? 0
                : isOutOfBoundsX === "R"
                ? window.innerWidth - bounding.width
                : coords.x - bounding.width / 2,
            right: isOutOfBoundsX === "R" ? 0 : "auto",
            bottom:
              isOutOfBoundsY === "T"
                ? Math.max(
                    0,
                    window.innerHeight - coords.bottom - bounding.height
                  )
                : window.innerHeight - coords.top,
            top: isOutOfBoundsY === "T" ? coords.bottom : "auto",
          }}
        >
          <p className="bg-white rounded-lg p-1 w-44 text-sm">{content}</p>
        </div>
      )}
    </>
  );
}
