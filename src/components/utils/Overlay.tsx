import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Container } from "../utils/Container";
import { Button } from "./Button";
import { X } from "lucide-react";

type Overlay = {
  close: () => void;
  title: string;
  testId?: string;
};

export const CloseContext = createContext(() => {});

export function Overlay({
  close,
  title,
  testId,
  children,
}: PropsWithChildren<Overlay>) {
  const [showDelayed, setShowDelayed] = useState(false);
  useEffect(() => {
    setShowDelayed(true);
  }, []);

  const animateAndClose = useCallback(() => {
    setShowDelayed(false);
    setTimeout(() => {
      close();
    }, 300);
  }, [close]);
  return (
    <div
      className={`z-30 fixed w-full h-[100lvh] bg-black top-0 left-0 ${
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
            className="h-fit relative max-w-[90vw]"
            testId={`${testId}-container`}
            header={
              <div className="flex mb-4">
                <div className="bg-amber-400 rounded-tl-xl text-xl px-2 font-bold text-center w-full">
                  {title}
                </div>
                <Button
                  color="red"
                  onClick={animateAndClose}
                  className="-mt-1 -mr-1 w-8 rounded-tr-2xl"
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
  );
}
