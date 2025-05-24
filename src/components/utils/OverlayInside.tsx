import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { useAppDispatch } from "../../hooks";
import { closeOverlay } from "../../modules/overlays/slice";

type Overlay = {
  title: string;
  testId?: string;
};

export const CloseContext = createContext(() => {});

export function OverlayInside({
  title,
  testId,
  children,
}: PropsWithChildren<Overlay>) {
  const [showDelayed, setShowDelayed] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  useEffect(() => {
    setShowDelayed(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const animateAndClose = useCallback(() => {
    setShowDelayed(false);
    setTimeout(() => {
      dispatch(closeOverlay());
    }, 300);
  }, []);
  return (
    <div>
      <div
        className={`z-20 fixed w-[100vw] h-[100lvh] bg-black top-0 left-0 ${
          showDelayed ? "bg-opacity-70" : "bg-opacity-0 pointer-events-none"
        } transition-all duration-150`}
        data-testid={`${testId}-background`}
      >
        <div
          className="flex items-center justify-center h-full w-full"
          onClick={animateAndClose}
          onKeyDown={(e) => {
            e.key === "Escape" && animateAndClose();
          }}
        >
          <div
            className={`size-fit transition-all ease-out duration-300 ${
              showDelayed
                ? "transform-none opacity-100"
                : " opacity-0 translate-y-[-100px]"
            }`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.key === "Escape" && animateAndClose();
            }}
          >
            <Container
              layoutClassName={`h-fit max-w-[90vw] ${
                !isDesktop && "w-[90vw] translate-y-6"
              }`}
              styleClassName={`overflow-y-auto ${
                isDesktop ? "max-h-[90lvh]" : "max-h-[calc(90lvh-3rem)]"
              }`}
              testId={`${testId}-container`}
              header={
                <div className="flex">
                  <div className="bg-amber-400 rounded-tl-xl text-xl pr-2 font-bold pt-1 pl-3 text-center w-full">
                    {title}
                  </div>
                  <Button
                    color="red"
                    onClick={animateAndClose}
                    className="w-8 rounded-tr-2xl"
                    title={t("close")}
                  >
                    <X className="pt-[2px] pr-[2px]" />
                  </Button>
                </div>
              }
            >
              <CloseContext.Provider value={animateAndClose}>
                {children}
              </CloseContext.Provider>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
