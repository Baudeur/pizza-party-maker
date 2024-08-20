import "./App.css";
import { Calculator } from "./components/calculator/Calculator";
import { People } from "./components/people/People";
import { Pizzas } from "./components/pizzas/Pizzas";

function App() {
  return (
    <div className="flex flex-col items-center">
      <img src="src/assets/Title.png" className="w-[800px] mb-11" />
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
