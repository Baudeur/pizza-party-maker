import { useRef, useState } from "react";
import { addPizza, PizzaWithoutID } from "../../modules/pizzas/slice";
import { PriceInput } from "../utils/PriceInput";
import { Button } from "../utils/Button";
import { Diet } from "../../types";
import { TextInput } from "../utils/TextInput";
import { DietSelector } from "../utils/DietSelector";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { IntegerInput } from "../utils/IntegerInput";
import { useTranslation } from "react-i18next";

export function PizzaForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [eatenBy, setEatenBy] = useState<Diet>("normal");
  const [quantity, setQuantity] = useState<number>(1);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const pizza: PizzaWithoutID = {
      name,
      eatenBy,
      price: Number(price),
      quantity,
    };
    dispatch(addPizza(pizza));
    setEatenBy("normal");
    setName("");
    setPrice("");
    setQuantity(1);
  };

  return (
    <tr
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
          nameInputRef.current?.focus();
        }
      }}
      data-testid="pizza-form"
    >
      <td className="align-top pt-2">
        <IntegerInput
          value={quantity}
          setValue={setQuantity}
          testId="pizza-form-quantity"
        />
      </td>
      <td className="align-top pt-2">
        <div className="flex flex-col items-start">
          <TextInput
            tabIndex={0}
            ref={nameInputRef}
            placeholder={t("pizza-form-placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            testId="pizza-form-name"
          />
        </div>
      </td>
      <td className="align-top pt-2">
        <DietSelector
          tabIndex={0}
          value={eatenBy}
          onChange={setEatenBy}
          testId="pizza-form-diet"
        />
      </td>
      <td className="align-top pt-2">
        <PriceInput
          tabIndex={0}
          price={price}
          setPrice={setPrice}
          testId="pizza-form-price"
        />
      </td>
      <td className="text-lg align-top pt-2 pl-2">
        <Button
          tabIndex={0}
          className={"rounded-lg w-[68px]"}
          color={"green"}
          onClick={handleSubmit}
          testId="pizza-form-submit"
        >
          <Plus size={20} strokeWidth={2} />
        </Button>
      </td>
    </tr>
  );
}
