import { Check, Undo2 } from "lucide-react";
import { Button } from "../utils/Button";
import { DietSelector } from "../utils/DietSelector";
import { IntegerInput } from "../utils/IntegerInput";
import { PriceInput } from "../utils/PriceInput";
import { TextInput } from "../utils/TextInput";
import { modifyPizza, Pizza, removePizza } from "../../modules/pizzas/slice";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { Diet } from "../../types";
import { EditContext } from "./PizzaLineWrapper";

type PizzaEditProps = {
  pizza: Pizza;
};

export function PizzaEdit({ pizza }: PizzaEditProps) {
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const dietInputRef = useRef<HTMLDivElement>(null);
  const { editable, setEditable, focus } = useContext(EditContext);
  const [name, setName] = useState(pizza.name);
  const [diet, setDiet] = useState<Diet>(pizza.eatenBy);
  const [price, setPrice] = useState(pizza.price);

  function handleSubmit() {
    const newPizza: Pizza = {
      id: pizza.id,
      name,
      eatenBy: diet,
      price,
      quantity: pizza.quantity,
    };
    dispatch(modifyPizza(newPizza));
    setEditable(false);
  }

  function handleCancel() {
    setName(pizza.name);
    setDiet(pizza.eatenBy);
    setPrice(pizza.price);
    setEditable(false);
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

  useEffect(() => {
    focus === "name" && nameInputRef.current?.focus();
    focus === "diet" && dietInputRef.current?.focus();
    focus === "price" && priceInputRef.current?.focus();
  }, [focus, editable]);

  return (
    <tr
      onKeyDown={(event) => {
        event.key === "Enter" && handleSubmit();
        event.key === "Escape" && handleCancel();
      }}
    >
      <td>
        <IntegerInput
          value={pizza.quantity}
          setValue={handleQuantityChange}
          onDelete={() => dispatch(removePizza(pizza.id))}
        />
      </td>
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
      <td className="pl-2 flex">
        <Button
          tabIndex={4}
          className="rounded-lg w-8 mr-1"
          color="green"
          onClick={() => handleSubmit()}
        >
          <Check size={20} strokeWidth={2} />
        </Button>
        <Button
          tabIndex={4}
          className="rounded-lg w-8"
          color="yellow"
          onClick={() => handleCancel()}
        >
          <Undo2 size={20} strokeWidth={2} />
        </Button>
      </td>
    </tr>
  );
}
