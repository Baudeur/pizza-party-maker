import "./App.css";
import { Calculator } from "./components/calculator/Calculator";
import { People } from "./components/people/People";
import { Pizzas } from "./components/pizzas/Pizzas";

function App() {
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex">
        <People />
        <Pizzas />
      </div>
      <Calculator />
    </div>
  );
}

export default App;
