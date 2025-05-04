import { useMediaQuery } from "react-responsive";
import { desktopSize, smallMobile } from "../../services/constants";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import title from "../../assets/Title.png";
import { Infos } from "../infos/Infos";
import { People } from "../people/People";
import { Pizzas } from "../pizzas/Pizzas";
import { Calculator } from "../calculator/Calculator";
import { Footer } from "./Footer";
import { useLayoutEffect } from "react";

export function HomePage() {
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const isSmallMobile =
    !isDesktop && useMediaQuery({ maxDeviceHeight: smallMobile });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      className={`flex flex-col justify-between  ${
        isDesktop ? "h-full" : "h-[calc(100dvh-3rem)] w-[100vw]"
      }`}
    >
      <div
        className={`flex flex-col items-center ${
          isDesktop
            ? "h-full"
            : isSmallMobile
            ? "h-[38rem]"
            : "h-full overflow-hidden"
        }`}
      >
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
        <div className={`flex flex-col items-stretch w-full relative h-full`}>
          <div
            className={`flex ${
              isDesktop ? "mb-8 gap-8" : "flex-col bg-amber-100 h-full"
            }`}
          >
            <People />
            <Mobile>
              <div className="bg-amber-400 h-[2px]"></div>
            </Mobile>
            <Pizzas />
          </div>
          <Desktop>
            <Calculator />
          </Desktop>
        </div>
      </div>
      <Desktop>
        <Footer />
      </Desktop>
      <Mobile>
        <Calculator />
      </Mobile>
    </div>
  );
}
