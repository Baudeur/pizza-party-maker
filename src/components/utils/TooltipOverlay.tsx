import { useSelector } from "react-redux";
import {
  tooltipContentSelector,
  tooltipCoordsSelector,
} from "../../modules/overlays/selector";
import { useLayoutEffect, useRef, useState } from "react";

export function TooltipOverlay() {
  const content = useSelector(tooltipContentSelector);
  const coords = useSelector(tooltipCoordsSelector);
  const [isOutOfBoundsX, setIsOutOfBoundsX] = useState<"L" | "R" | undefined>(
    undefined
  );
  const [isOutOfBoundsY, setIsOutOfBoundsY] = useState<"T" | "B" | undefined>(
    undefined
  );
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bounding = ref.current?.getBoundingClientRect();
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
              isOutOfBoundsX !== "R"
                ? coords.x + coords.width
                : Math.max(
                    0,
                    coords.x - (ref.current?.getBoundingClientRect().width ?? 0)
                  ),
            right:
              isOutOfBoundsX === "R" ? window.innerWidth - coords.x : "auto",
            bottom:
              isOutOfBoundsY === "T"
                ? Math.max(
                    0,
                    window.innerHeight -
                      coords.y -
                      coords.height -
                      (ref.current?.getBoundingClientRect().height ?? 0)
                  )
                : window.innerHeight - coords.y,
            top: isOutOfBoundsY !== "T" ? "auto" : coords.y + coords.height,
          }}
        >
          <p className="bg-white rounded-lg p-1 w-44 text-sm">{content}</p>
        </div>
      )}
    </>
  );
}
