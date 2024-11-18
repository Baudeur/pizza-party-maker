import { useDispatch, useSelector } from "react-redux";
import {
  loadedPizzeriaSelector,
  pizzeriasSelector,
} from "../../modules/pizzerias/selector";
import { ChevronRight, Trash2 } from "lucide-react";
import { Button } from "../utils/Button";
import {
  loadPizzeria,
  Pizzeria,
  removePizzeria,
} from "../../modules/pizzerias/slice";
import { setPizzas } from "../../modules/pizzas/slice";
import { useContext, useState } from "react";
import { PizzeriaDisplayer } from "./PizzeriaDisplayer";
import { CloseContext } from "../utils/Overlay";

export function ManagePizzeriaOverlayContent() {
  const pizzerias = useSelector(pizzeriasSelector);
  const loadedPizzeriaId = useSelector(loadedPizzeriaSelector);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<undefined | Pizzeria>(undefined);
  const close = useContext(CloseContext);

  const handleLoad = (pizzeria: Pizzeria) => {
    dispatch(loadPizzeria(pizzeria.id));
    dispatch(setPizzas(pizzeria.pizzas));
    close();
  };

  const handleClick = (pizzeria: Pizzeria) => {
    if (pizzeria.id === selected?.id) {
      setSelected(undefined);
    } else {
      setSelected(pizzeria);
    }
  };

  return (
    <div className="w-[750px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-2 text-center w-full">
        Manage or load pizzerias
      </p>
      <div className="flex w-full gap-2 h-96 mt-4">
        <div
          className={`flex flex-col gap-1 ${
            selected ? "w-1/2" : "w-full"
          } overflow-y-auto`}
        >
          {pizzerias.map((pizzeria) => (
            <div className="flex w-full gap-1" key={pizzeria.id}>
              <Button
                color="red"
                onClick={() => dispatch(removePizzeria(pizzeria.id))}
                className="rounded-lg px-2"
                testId={`manage-${pizzeria.name}-delete-button`}
              >
                <Trash2 size={20} strokeWidth={2} />
              </Button>
              <Button
                color="green"
                onClick={() => handleLoad(pizzeria)}
                disabled={pizzeria.id === loadedPizzeriaId}
                className="rounded-lg px-2 w-26"
                testId={`manage-${pizzeria.name}-load-button`}
              >
                {pizzeria.id === loadedPizzeriaId ? "Loaded" : "Load"}
              </Button>
              <button
                className={`flex justify-between rounded-lg ${
                  pizzeria.id === selected?.id ? "bg-amber-300" : "bg-amber-200"
                } px-2 items-center hover:brightness-90 active:brightness-[80%] truncate w-full`}
                onClick={() => handleClick(pizzeria)}
                data-testid={`manage-${pizzeria.name}-select-button`}
              >
                <div className="truncate text-left" title={pizzeria.name}>
                  {pizzeria.name}
                </div>
                <div>
                  <ChevronRight size={20} strokeWidth={2} />
                </div>
              </button>
            </div>
          ))}
        </div>
        {/* {selected && <div className="w-0.5 bg-gray-400"></div>} */}
        {selected && (
          <div className={`flex flex-col w-1/2 max-h-96`}>
            <PizzeriaDisplayer
              pizzeria={selected}
              className="border-none max-h-96"
              testId={`manage-${selected.name}-displayer`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
