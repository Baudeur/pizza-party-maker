import "./App.css";
import { Calculator } from "./components/calculator/Calculator";
import { Infos } from "./components/infos/Infos";
import { People } from "./components/people/People";
import { Pizzas } from "./components/pizzas/Pizzas";
import title from "./assets/Title.png";
import { Footer } from "./components/utils/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <img
            src={title}
            className="w-[800px] my-11"
            alt="Pizza Party Maker"
          />
          <div className="w-full flex justify-end bottom-0 absolute">
            <Infos />
          </div>
        </div>
        <div className="flex flex-col items-stretch">
          <div className="flex">
            <People />
            <Pizzas />
          </div>
          <Calculator />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
