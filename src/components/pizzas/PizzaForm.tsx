import { useRef, useState } from "react";
import { addPizza, PizzaWithoutID } from "../../modules/pizzas/slice";
import { PriceInput } from "../utils/PriceInput";
import { Button } from "../utils/Button";
import { Diet } from "../../types";
import { TextInput } from "../utils/TextInput";
import { DietSelector } from "../utils/DietSelector";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

export function PizzaForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [eatenBy, setEatenBy] = useState<Diet>("normal");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const pizza: PizzaWithoutID = {
      name,
      eatenBy,
      price: Number(price),
    };
    dispatch(addPizza(pizza));
    setEatenBy("normal");
    setName("");
    setPrice("");
  };

  return (
    <tr
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
          nameInputRef.current?.focus();
        }
      }}
    >
      <td></td>
      <td className="align-top pt-2">
        <div className="flex flex-col items-start">
          <TextInput
            tabIndex={11}
            ref={nameInputRef}
            placeholder="4 Cheese"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </td>
      <td className="align-top pt-2 h-[70px]">
        <DietSelector tabIndex={12} value={eatenBy} onChange={setEatenBy} />
      </td>
      <td className="align-top pt-2">
        <PriceInput tabIndex={13} price={price} setPrice={setPrice} />
      </td>
      <td className="text-lg align-top pt-2 pl-2">
        <Button
          tabIndex={14}
          className={"rounded-lg w-[68px]"}
          color={"green"}
          onClick={handleSubmit}
        >
          <Plus size={20} strokeWidth={2} />
        </Button>
      </td>
    </tr>
  );
}
