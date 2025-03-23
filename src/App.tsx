import "./App.css";
import { Calculator } from "./components/calculator/Calculator";
import { Infos } from "./components/infos/Infos";
import { People } from "./components/people/People";
import { Pizzas } from "./components/pizzas/Pizzas";
import title from "./assets/Title.png";
import { Footer } from "./components/utils/Footer";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "./services/constants";
import { Desktop } from "./components/utils/ReactiveComponents";

function App() {
  const isDesktop = useMediaQuery({ minWidth: desktopSize });
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <img
            src={title}
            className={`${isDesktop ? "w-[800px]" : "w-4/5"} my-11`}
            alt="Pizza Party Maker"
          />
          <div className="w-full flex justify-end bottom-0 absolute">
            <Infos />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-8 w-full relative">
          <div className={`flex gap-8 ${!isDesktop && "flex-col mb-28"}`}>
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

export default App;
