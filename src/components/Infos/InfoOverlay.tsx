import { Container } from "../utils/Container";
import { InfoContent } from "./InfoContent";

type InfoOverlayProps = {
  show: boolean;
  close: () => void;
};

export function InfoOverlay({ show, close }: InfoOverlayProps) {
  return (
    <div
      className={`z-20 fixed size-full bg-black top-0 left-0 ${
        show ? "bg-opacity-70" : "bg-opacity-0 pointer-events-none"
      } transition-all duration-150`}
    >
      <div className="flex items-center justify-center h-full" onClick={close}>
        <div
          className={`size-fit transition-all ease-out duration-300 ${
            show
              ? "transform-none opacity-100"
              : " opacity-0 translate-y-[-100px]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Container className="h-fit">
            <InfoContent />
          </Container>
        </div>
      </div>
    </div>
  );
}
