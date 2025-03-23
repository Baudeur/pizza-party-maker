import { useDispatch } from "react-redux";
import { modifyPizza, Pizza, removePizza } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { Pencil, Trash2 } from "lucide-react";
import { DietDisplay } from "./DietDisplay";
import { useContext, useState } from "react";
import { IntegerInput } from "../utils/IntegerInput";
import { EditContext } from "./PizzaLineWrapper";
import { priceToString } from "../../services/utils";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { useTranslation } from "react-i18next";

type PizzaDisplayProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

export function PizzaDisplay({ pizza }: Readonly<PizzaDisplayProps>) {
  const dispatch = useDispatch();
  const { setFocus } = useContext(EditContext);
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  function handleDoubleClick(focus: Focusable) {
    const modifiedPizza: Pizza = {
      id: pizza.id,
      name: pizza.name,
      eatenBy: pizza.eatenBy,
      price: pizza.price,
      quantity: pizza.quantity,
      editable: true,
    };
    dispatch(modifyPizza(modifiedPizza));
    setFocus(focus);
  }

  function handleQuantityChange(quantity: number) {
    const newPizza: Pizza = {
      id: pizza.id,
      name: pizza.name,
      eatenBy: pizza.eatenBy,
      price: pizza.price,
      quantity: quantity,
      editable: pizza.editable,
    };
    dispatch(modifyPizza(newPizza));
  }

  return (
    <EitherDesktopOrMobile>
      <tr
        onMouseEnter={() => setHovered(true)}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-testid={`${pizza.id}-pizza-display`}
      >
        <td>
          <IntegerInput
            value={pizza.quantity}
            setValue={handleQuantityChange}
            animateShow={hovered}
            onDelete={() => dispatch(removePizza(pizza.id))}
            className="z-[5]"
            testId={`${pizza.id}-pizza-display-quantity`}
          />
        </td>
        <td
          className="flex relative h-8"
          onDoubleClick={() => handleDoubleClick("name")}
        >
          <div
            className="truncate absolute right-0 left-0 text-left pl-2 h-8 py-[2px]"
            data-testid={`${pizza.id}-pizza-display-name`}
          >
            {pizza.name}
          </div>
        </td>
        <td onDoubleClick={() => handleDoubleClick("diet")}>
          <DietDisplay
            diet={pizza.eatenBy}
            testId={`${pizza.id}-pizza-display-diet`}
          />
        </td>
        <td onDoubleClick={() => handleDoubleClick("price")}>
          <div className="flex items-center h-8 justify-end">
            <div
              className="text-right pr-2 h-8 py-[2px]"
              data-testid={`${pizza.id}-pizza-display-price`}
            >
              {priceToString(pizza.price)} €
            </div>
          </div>
        </td>
        <td className="relative overflow-hidden">
          <div
            className={`flex justify-end absolute top-[1px] ${
              hovered ? "right-[1px]" : "right-[100%]"
            } transition-all ease-out duration-200`}
          >
            <Button
              className="rounded-lg w-8 mr-1"
              color="green"
              onClick={() => handleDoubleClick("name")}
              testId={`${pizza.id}-pizza-display-edit-button`}
              title="Edit pizza"
            >
              <Pencil size={20} strokeWidth={2} />
            </Button>
            <Button
              className="rounded-lg w-8"
              color="red"
              onClick={() => dispatch(removePizza(pizza.id))}
              testId={`${pizza.id}-pizza-display-delete-button`}
              title="Delete pizza"
            >
              <Trash2 size={20} strokeWidth={2} />
            </Button>
          </div>
        </td>
      </tr>
      {/* Mobile */}
      <div className="flex w-full flex-col bg-amber-200 rounded-lg gap-3">
        <div className="flex">
          <div className="flex relative h-8 w-full bg-amber-300 rounded-tl-lg">
            <div
              className="truncate absolute right-0 left-0 font-bold pl-2 h-8 py-[2px]"
              data-testid={`${pizza.id}-pizza-display-name`}
            >
              {pizza.name || "(undefined)"}
            </div>
          </div>
          <Button
            className="min-w-8"
            color="green"
            onClick={() => handleDoubleClick("name")}
            testId={`${pizza.id}-pizza-display-edit-button`}
            title="Edit pizza"
          >
            <Pencil size={20} strokeWidth={2} />
          </Button>
          <Button
            className="min-w-8 rounded-tr-lg"
            color="red"
            onClick={() => dispatch(removePizza(pizza.id))}
            testId={`${pizza.id}-pizza-display-delete-button`}
            title="Delete pizza"
          >
            <Trash2 size={20} strokeWidth={2} />
          </Button>
        </div>

        <div className="flex">
          <div className="w-1/2 text-right px-2">
            {t("pizza-table-eaten-by")}
          </div>
          <div className="w-1/2 flex justify-start">
            <DietDisplay
              diet={pizza.eatenBy}
              testId={`${pizza.id}-pizza-display-diet`}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 text-right px-2">{t("pizza-table-price")}</div>
          <div className="w-1/2 flex justify-start">
            <div
              className="h-8 text-left w-32 px-2 py-[2px]"
              data-testid={`${pizza.id}-pizza-display-price`}
            >
              {priceToString(pizza.price)} €
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <IntegerInput
            value={pizza.quantity}
            setValue={handleQuantityChange}
            onDelete={() => dispatch(removePizza(pizza.id))}
            className="z-[5]"
            testId={`${pizza.id}-pizza-display-quantity`}
          />
        </div>
        <div className={`flex w-full`}></div>
      </div>
    </EitherDesktopOrMobile>
  );
}
