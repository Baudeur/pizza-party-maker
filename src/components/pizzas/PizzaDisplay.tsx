import { useDispatch } from "react-redux";
import { modifyPizza, Pizza, removePizza } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { Pencil, Trash2 } from "lucide-react";
import { DietDisplay } from "./DietDisplay";
import { useContext, useState } from "react";
import { IntegerInput } from "../utils/IntegerInput";
import { EditContext } from "./PizzaLineWrapper";

type PizzaDisplayProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

export function PizzaDisplay({ pizza }: PizzaDisplayProps) {
  const dispatch = useDispatch();
  const { setEditable, setFocus } = useContext(EditContext);
  const [hovered, setHovered] = useState(false);

  function handleDoubleClick(focus: Focusable) {
    setEditable(true);
    setFocus(focus);
  }

  function handleQuantityChange(quantity: number) {
    const newPizza: Pizza = {
      id: pizza.id,
      name: pizza.name,
      eatenBy: pizza.eatenBy,
      price: pizza.price,
      quantity: quantity,
    };
    dispatch(modifyPizza(newPizza));
  }

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td className="relative">
        <IntegerInput
          value={pizza.quantity}
          setValue={handleQuantityChange}
          animateShow={hovered}
          onDelete={() => dispatch(removePizza(pizza.id))}
          className="absolute z-[5] top-0"
        />
        <div className="absolute top-0 h-8 w-full bg-amber-100">
          <div className="pt-[2px] font-bold w-24">{pizza.quantity}</div>
        </div>
      </td>
      <td
        className="flex relative h-8"
        onDoubleClick={() => handleDoubleClick("name")}
      >
        <div className="truncate absolute right-0 left-0 text-left pl-2 h-8 py-[2px]">
          {pizza.name}
        </div>
      </td>
      <td onDoubleClick={() => handleDoubleClick("diet")}>
        <DietDisplay diet={pizza.eatenBy} />
      </td>
      <td onDoubleClick={() => handleDoubleClick("price")}>
        <div className="flex items-center h-8 justify-end">
          <div className="text-right pr-2 h-8 py-[2px]">{pizza.price} €</div>
        </div>
      </td>
      <td className="relative overflow-hidden">
        <div
          className={`pl-2 flex absolute top-0 ${
            hovered ? "left-0" : "left-[-100%]"
          } transition-all ease-out duration-200`}
        >
          <Button
            className="rounded-lg w-8 mr-1"
            color="green"
            onClick={() => handleDoubleClick("name")}
          >
            <Pencil size={20} strokeWidth={2} />
          </Button>
          <Button
            className="rounded-lg w-8"
            color="red"
            onClick={() => dispatch(removePizza(pizza.id))}
          >
            <Trash2 size={20} strokeWidth={2} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
