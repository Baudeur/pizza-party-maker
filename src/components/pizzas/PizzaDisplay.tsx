import { useDispatch } from "react-redux";
import { Pizza, removePizza } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { Trash2 } from "lucide-react";
import { DietDisplay } from "./DietDisplay";

type PizzaDisplayProps = {
  pizza: Pizza;
};

export function PizzaDisplay({ pizza }: PizzaDisplayProps) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td className="flex relative h-8">
        {/* <Editable
          type="text"
          initialValue={pizza.name}
          validate={(name) => dispatch(modifyPizza({ ...pizza, name: name }))}
          display={(value) => value}
          textClass="text-left pl-2"
        /> */}
        <div className="truncate absolute right-0 left-0 text-left pl-2 h-8">
          {pizza.name}
        </div>
      </td>
      <td>
        <DietDisplay diet={pizza.eatenBy} />
      </td>
      <td>
        <div className="text-right pr-2 h-8">{pizza.price} €</div>
        {/* <Editable
          type="price"
          initialValue={pizza.price + ""}
          validate={(price) =>
            dispatch(modifyPizza({ ...pizza, price: Number(price) }))
          }
          display={(value) => value + " €"}
          textClass="text-right pr-2"
        /> */}
      </td>
      <td className="pl-2">
        <Button
          className="rounded-lg w-8"
          color="red"
          onClick={() => dispatch(removePizza(pizza.id))}
        >
          <Trash2 size={20} strokeWidth={2} />
        </Button>
      </td>
    </tr>
  );
}
