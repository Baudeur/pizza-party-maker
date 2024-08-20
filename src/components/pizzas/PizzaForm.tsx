import { useRef, useState } from "react";
import { PizzaWithoutID } from "../../modules/pizzas/slice";
import { PriceInput } from "../utils/PriceInput";
import { Button } from "../utils/Button";
import { Diet } from "../../types";
import { TextInput } from "../utils/TextInput";
import { DietSelector } from "../utils/DietSelector";

type PizzaFormProps = {
  onPizzaCreate: (pizza: PizzaWithoutID) => void;
};

export function PizzaForm(props: PizzaFormProps) {
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
    props.onPizzaCreate(pizza);
    setEatenBy("normal");
    setName("");
    setPrice("");
  };

  return (
    <tr
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          handleSubmit();
          nameInputRef.current?.focus();
        }
      }}
    >
      <td className="align-top pt-2">
        <div className="flex flex-col items-start">
          <TextInput
            tabIndex={1}
            ref={nameInputRef}
            placeholder="4 Cheese"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </td>
      <td className="align-top pt-2 h-[70px]">
        <DietSelector tabIndex={2} value={eatenBy} onChange={setEatenBy} />
      </td>
      <td className="align-top pt-2">
        <PriceInput tabIndex={3} price={price} setPrice={setPrice} />
      </td>
      <td className="text-lg align-top pt-2 pl-2">
        <Button
          tabIndex={4}
          className={"rounded-lg w-16"}
          color={"green"}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </td>
    </tr>
  );
}
