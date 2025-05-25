import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { closeTooltip, openTooltip } from "../../modules/overlays/slice";

type TooltipProps = {
  className?: string;
  content: string;
};

export function Tooltip({
  children,
  className,
  content,
}: PropsWithChildren<TooltipProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleOpen = useCallback(() => {
    dispatch(
      openTooltip({
        content: content,
        coords: {
          x: ref.current?.getBoundingClientRect()?.x ?? 0,
          y: ref.current?.getBoundingClientRect()?.y ?? 0,
          width: ref.current?.getBoundingClientRect()?.width ?? 0,
          height: ref.current?.getBoundingClientRect()?.height ?? 0,
        },
      })
    );
  }, [ref, content]);

  useEffect(() => {
    addEventListener("touchstart", () => dispatch(closeTooltip()));
    return () => {
      removeEventListener("touchstart", () => dispatch(closeTooltip()));
    };
  }, []);

  return (
    <div
      className={className}
      ref={ref}
      onMouseEnter={() => handleOpen()}
      onMouseLeave={() => dispatch(closeTooltip())}
      onClick={() => {
        handleOpen();
      }}
    >
      {children}
    </div>
  );
}
