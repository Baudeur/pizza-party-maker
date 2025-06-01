import {
  MouseEvent as ReactMouseEvent,
  PointerEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

type Swipable = {
  onSwipeFinish: (value: number) => void;
  onSwipeStart?: () => void;
  onSwipeMove?: (value: number) => void;
  maxSwipe?: number;
  minSwipe?: number;
  className?: string;
  vertical?: boolean;
  noMovement?: boolean;
  disabled?: boolean;
};

export function Swipable({
  children,
  onSwipeFinish,
  onSwipeStart,
  onSwipeMove,
  maxSwipe = window.screen.width,
  minSwipe = -window.screen.width,
  className = "",
  vertical = false,
  noMovement = false,
  disabled = false,
}: PropsWithChildren<Swipable>) {
  const [start, setStart] = useState(0);
  const [movement, setMovement] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const handleMouseDown = useCallback((e: PointerEvent | ReactMouseEvent) => {
    setIsSwiped(true);
    setStart(vertical ? e.clientY : e.clientX);
    if (onSwipeStart) onSwipeStart();
  }, []);

  const handleMouseMove = useCallback(
    (e: PointerEvent | MouseEvent) => {
      if (!isSwiped) return;
      let newValue = (vertical ? e.clientY : e.clientX) - start;
      if (maxSwipe != undefined) newValue = Math.min(maxSwipe, newValue);
      if (minSwipe != undefined) newValue = Math.max(minSwipe, newValue);
      setMovement(newValue);
      if (onSwipeMove) onSwipeMove(newValue);
    },
    [isSwiped, minSwipe, maxSwipe]
  );

  const handleMouseUp = useCallback(() => {
    if (!isSwiped) return;
    setIsSwiped(false);
    onSwipeFinish(movement);
    setMovement(0);
  }, [isSwiped, movement]);

  useEffect(() => {
    if (!isTouch) addEventListener("mousemove", handleMouseMove);
    return () => {
      if (!isTouch) removeEventListener("mousemove", handleMouseMove);
    };
  });

  return disabled ? (
    <div>{children}</div>
  ) : (
    <div
      style={
        !noMovement
          ? vertical
            ? {
                top: movement,
              }
            : {
                left: movement,
              }
          : {}
      }
      onGotPointerCapture={isTouch ? handleMouseDown : () => {}}
      onPointerUp={isTouch ? handleMouseUp : () => {}}
      onPointerMove={isTouch ? handleMouseMove : () => {}}
      onPointerCancel={isTouch ? handleMouseUp : () => {}}
      onMouseDown={!isTouch ? handleMouseDown : () => {}}
      onMouseUp={!isTouch ? handleMouseUp : () => {}}
      className={`${className} relative float-left ${
        vertical ? "touch-none" : "touch-pan-y"
      } left-0 w-full h-full`}
    >
      {children}
    </div>
  );
}
