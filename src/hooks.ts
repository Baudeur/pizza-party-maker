import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

const LONG_PRESS_TIME_MS = 500;

export function useLongPress() {
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  function handleOnClick(onClick: () => void) {
    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
        setTimer(undefined);
        onClick();
      }
    };
  }

  function handleTouchStart(onLongPress: () => void) {
    return () => {
      const timeout = setTimeout(() => {
        onLongPress(), setTimer(undefined);
      }, LONG_PRESS_TIME_MS);
      setTimer(timeout);
    };
  }

  return (onClick: () => void, onLongPress: () => void) => ({
    onClick: handleOnClick(onClick),
    onTouchStart: handleTouchStart(onLongPress),
    onMouseDown: handleTouchStart(onLongPress),
  });
}
