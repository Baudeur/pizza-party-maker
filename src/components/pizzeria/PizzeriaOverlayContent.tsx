import { Save, Trash2, Upload } from "lucide-react";
import { Button } from "../utils/Button";
import { TextInput } from "../utils/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { pizzeriasSelector } from "../../modules/pizzerias/selector";
import { useState } from "react";
import {
  addPizzeria,
  PizzeriaWithoutID,
  removePizzeria,
} from "../../modules/pizzerias/slice";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzeriaPizzasDisplayer } from "./PizzeriaPizzasDisplayer";
import { NoVisibleEffectButton } from "../utils/NoVisibleEffectButton";

export function PizzeriaOverlayContent() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const pizzerias = useSelector(pizzeriasSelector);
  const pizzas = useSelector(pizzasSelector);

  function handleCreatePizzeria() {
    const newPizzeria: PizzeriaWithoutID = {
      name,
      pizzas: pizzas,
    };
    dispatch(addPizzeria(newPizzeria));
  }
  return (
    <div className="w-[500px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-4 text-center w-full">
        Save pizzeria
      </p>
      <div className="flex justify-between w-full items-center mb-4">
        <div className="flex gap-2 w-full">
          <TextInput
            placeholder="Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full"
          />
          <NoVisibleEffectButton
            color="green"
            onClick={handleCreatePizzeria}
            className="min-w-[68px] rounded-lg"
          >
            <Save size={20} strokeWidth={2} />
          </NoVisibleEffectButton>
        </div>
      </div>
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-4 text-center w-full">
        Load or delete pizzeria
      </p>
      <div>
        {pizzerias.map((pizzeria) => (
          <div
            key={pizzeria.id}
            className="flex gap-2 justify-between items-center mb-1"
          >
            <span className="text-left truncate">{pizzeria.name}</span>
            <div className="flex items-center">
              <PizzeriaPizzasDisplayer pizzas={pizzeria.pizzas} />
              <NoVisibleEffectButton
                animation="jump"
                color="green"
                onClick={() => {}}
                className="w-8 rounded-lg mr-1 ml-2"
                title="Save here"
              >
                <Upload size={20} strokeWidth={2} />
              </NoVisibleEffectButton>
              <Button
                color="red"
                onClick={() => dispatch(removePizzeria(pizzeria.id))}
                className="w-8 rounded-lg"
                title="Delete"
              >
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//TODO, save button next to store button, implement load pizzas, animation ? get something better ?
