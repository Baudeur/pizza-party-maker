import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "../../hooks";
import { closeTooltip, openTooltip } from "../../modules/overlays/slice";
import { desktopSize } from "../../services/constants";
import { useMediaQuery } from "react-responsive";

type TooltipProps = {
  className?: string;
  content: string;
  delayed?: number;
};

export function Tooltip({
  children,
  className,
  content,
  delayed,
}: PropsWithChildren<TooltipProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenTooltip = useCallback(() => {
    setIsOpened(true);
    dispatch(
      openTooltip({
        content: content,
        coords: {
          x:
            (ref.current?.getBoundingClientRect()?.x ?? 0) +
            (ref.current?.getBoundingClientRect()?.width ?? 0) / 2,
          top: (ref.current?.getBoundingClientRect()?.y ?? 0) - 4,
          bottom:
            (ref.current?.getBoundingClientRect()?.y ?? 0) +
            (ref.current?.getBoundingClientRect()?.height ?? 0) +
            4,
        },
      })
    );
  }, [ref, content]);

  const handleCloseTooltip = useCallback(() => {
    setIsOpened(false);
    dispatch(closeTooltip());
  }, []);

  const handleOpen = useCallback(() => {
    if (delayed && isDesktop) {
      const timeout = setTimeout(() => {
        handleOpenTooltip();
        setTimer(undefined);
      }, delayed);
      setTimer(timeout);
      return;
    }
    handleOpenTooltip();
  }, [ref, content, timer]);

  const handleClose = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    } else {
      handleCloseTooltip();
    }
    setTimer(undefined);
  }, [timer]);

  useEffect(() => {
    addEventListener("touchstart", () => handleCloseTooltip());
    return () => {
      removeEventListener("touchstart", () => handleCloseTooltip());
    };
  }, []);

  useEffect(() => {
    return () => {
      if (isOpened) dispatch(closeTooltip());
    };
  }, [isOpened]);

  return (
    <div
      className={className}
      ref={ref}
      onMouseEnter={() => handleOpen()}
      onMouseOver={() => handleOpen()}
      onMouseLeave={() => handleClose()}
      onClick={() => {
        if (!isDesktop) handleOpen();
      }}
    >
      {isOpened}
      {children}
    </div>
  );
}
