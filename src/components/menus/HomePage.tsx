import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop } from "../utils/ReactiveComponents";
import title from "../../assets/Title.png";
import { Infos } from "../infos/Infos";
import { People } from "../people/People";
import { Pizzas } from "../pizzas/Pizzas";
import { Calculator } from "../calculator/Calculator";
import { Footer } from "./Footer";

export function HomePage() {
  const isDesktop = useMediaQuery({ minWidth: desktopSize });
  return (
    <div
      className={`flex flex-col justify-between h-full ${
        !isDesktop && "w-[100vw]"
      }`}
    >
      <div className="flex flex-col items-center">
        <Desktop>
          <div className="relative w-full flex justify-center">
            <img
              src={title}
              className={`w-[800px] my-11`}
              alt="Pizza Party Maker"
            />
            <div className="w-full flex justify-end bottom-0 absolute">
              <Infos />
            </div>
          </div>
        </Desktop>
        <div
          className={`flex flex-col items-stretch w-full relative ${
            !isDesktop && "h-[100dvh]"
          }`}
        >
          <div
            className={`flex gap-8 ${
              !isDesktop && "flex-col mt-8 h-full"
            } mb-8`}
          >
            <People />
            <Pizzas />
          </div>
          <Calculator />
        </div>
      </div>
      <Desktop>
        <Footer />
      </Desktop>
    </div>
  );
}
