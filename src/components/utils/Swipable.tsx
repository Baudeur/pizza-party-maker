import { PointerEvent, PropsWithChildren, useCallback, useState } from "react";

type Swipable = {
  onSwipeFinish: (value: number) => void;
  onSwipeMove?: (value: number) => void;
  maxSwipe?: number;
  minSwipe?: number;
  className?: string;
};

export function Swipable({
  children,
  onSwipeFinish,
  onSwipeMove,
  maxSwipe = window.screen.width,
  minSwipe = -window.screen.width,
  className = "",
}: PropsWithChildren<Swipable>) {
  const [startX, setStartX] = useState(0);
  const [movement, setMovement] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleMouseDown = useCallback((e: PointerEvent) => {
    setIsSwiped(true);
    setStartX(e.clientX);
    console.log("SuccessDown");
  }, []);

  const handleMouseMove = useCallback(
    (e: PointerEvent) => {
      if (!isSwiped) return;
      let newValue = e.clientX - startX;
      if (maxSwipe != undefined) newValue = Math.min(maxSwipe, newValue);
      if (minSwipe != undefined) newValue = Math.max(minSwipe, newValue);
      setMovement(newValue);
      if (onSwipeMove) onSwipeMove(newValue);
    },
    [isSwiped, minSwipe, maxSwipe]
  );

  const handleMouseUp = useCallback(() => {
    console.log("TryUp");
    if (!isSwiped) return;
    setIsSwiped(false);
    onSwipeFinish(movement);
    setMovement(0);
    console.log("SuccessUp");
  }, [isSwiped, movement]);

  return (
    <div
      style={{
        left: movement,
      }}
      onGotPointerCapture={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
      onPointerCancel={handleMouseUp}
      className={`${className} relative float-left touch-pan-y z-10 left-0 w-full h-full `}
    >
      {children}
    </div>
  );
}
