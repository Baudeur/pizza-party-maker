import { PropsWithChildren, useEffect, useState } from "react";
import { Container } from "../utils/Container";

type Overlay = {
  close: () => void;
};

export function Overlay({ close, children }: PropsWithChildren<Overlay>) {
  const [showDelayed, setShowDelayed] = useState(false);
  useEffect(() => {
    setShowDelayed(true);
  }, []);

  const animateAndClose = () => {
    setShowDelayed(false);
    setTimeout(() => {
      close();
    }, 300);
  };
  return (
    <div
      className={`z-30 fixed size-full bg-black top-0 left-0 ${
        showDelayed ? "bg-opacity-70" : "bg-opacity-0 pointer-events-none"
      } transition-all duration-150`}
    >
      <button
        className="flex items-center justify-center h-full w-full cursor-default"
        onClick={animateAndClose}
      >
        <button
          className={`size-fit transition-all ease-out duration-300 cursor-default ${
            showDelayed
              ? "transform-none opacity-100"
              : " opacity-0 translate-y-[-100px]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Container className="h-fit">{children}</Container>
        </button>
      </button>
    </div>
  );
}
