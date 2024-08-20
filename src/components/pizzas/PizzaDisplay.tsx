import { useDispatch } from "react-redux";
import { modifyPizza, Pizza, removePizza } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { Check, Trash2 } from "lucide-react";
import { DietDisplay } from "./DietDisplay";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "../utils/TextInput";
import { DietSelector } from "../utils/DietSelector";
import { Diet } from "../../types";
import { PriceInput } from "../utils/PriceInput";

type PizzaDisplayProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

export function PizzaDisplay({ pizza }: PizzaDisplayProps) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const dietInputRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(pizza.name);
  const [diet, setDiet] = useState<Diet>(pizza.eatenBy);
  const [price, setPrice] = useState(pizza.price);
  const [focus, setFocus] = useState<Focusable>("name");

  const handleSubmit = () => {
    const newPizza: Pizza = {
      id: pizza.id,
      name,
      eatenBy: diet,
      price,
    };
    dispatch(modifyPizza(newPizza));
    setEditable(false);
  };

  function handleDoubleClick(focus: Focusable) {
    setEditable(true);
    setFocus(focus);
  }

  useEffect(() => {
    focus == "name" && nameInputRef.current?.focus();
    focus == "diet" && dietInputRef.current?.focus();
    focus == "price" && priceInputRef.current?.focus();
  }, [focus, editable]);

  return (
    <tr>
      {!editable && (
        <>
          <td
            className="flex relative h-8"
            onDoubleClick={() => handleDoubleClick("name")}
          >
            <div className="truncate absolute right-0 left-0 text-left pl-2 h-8">
              {pizza.name}
            </div>
          </td>
          <td onDoubleClick={() => handleDoubleClick("diet")}>
            <DietDisplay diet={pizza.eatenBy} />
          </td>
          <td onDoubleClick={() => handleDoubleClick("price")}>
            <div className="text-right pr-2 h-8">{pizza.price} €</div>
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
        </>
      )}
      {editable && (
        <>
          <td>
            <TextInput
              tabIndex={1}
              ref={nameInputRef}
              placeholder="4 Cheese"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>
            <DietSelector
              ref={dietInputRef}
              value={diet}
              onChange={(diet) => setDiet(diet)}
              tabIndex={2}
            />
          </td>
          <td>
            <PriceInput
              ref={priceInputRef}
              price={price.toString()}
              setPrice={(price) => setPrice(Number(price))}
              tabIndex={3}
            />
          </td>
          <td className="pl-2">
            <Button
              tabIndex={4}
              className="rounded-lg w-8"
              color="green"
              onClick={() => handleSubmit()}
            >
              <Check size={20} strokeWidth={2} />
            </Button>
          </td>
        </>
      )}
    </tr>
  );
}
