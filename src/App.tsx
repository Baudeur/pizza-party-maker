import "./App.css";
import { Calculator } from "./components/calculator/Calculator";
import { Infos } from "./components/infos/Infos";
import { People } from "./components/people/People";
import { Pizzas } from "./components/pizzas/Pizzas";
import title from "./assets/Title.png";

function App() {
  return (
    <div className="flex flex-col items-center relative">
      <img src={title} className="w-[800px] my-11" alt="Pizza Party Maker" />
      <div className="w-full flex justify-end top-32 absolute">
        <Infos />
      </div>
      <div className="flex flex-col items-stretch">
        <div className="flex">
          <People />
          <Pizzas />
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
