import { useDispatch, useSelector } from "react-redux";
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
import { Swipable } from "../utils/Swipable";
import { pizzeriaStateSelector } from "../../modules/pizzerias/selector";
import { useLongPress } from "../../hooks";

type PizzaDisplayProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

const binSize = 40;
const maxSwipe = 200;
const deleteThreshold = 95;
const opacityRampUpBy = 20;
const opacityRampUpTo = 50; //Must be greater than opacityRampUpTo
const opacityFinishedBy = deleteThreshold; //Should be linked to delete threshold

export function PizzaDisplay({ pizza }: Readonly<PizzaDisplayProps>) {
  const dispatch = useDispatch();
  const { setFocus } = useContext(EditContext);
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();
  const [swipePercentage, setSwipePercentage] = useState(0);
  const pizzeriaState = useSelector(pizzeriaStateSelector);
  const onLongPress = useLongPress();

  function handleDoubleClick(focus: Focusable) {
    if (pizzeriaState === "loaded") return;
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
            onDelete={
              pizzeriaState !== "loaded"
                ? () => dispatch(removePizza(pizza.id))
                : undefined
            }
            className="z-[5]"
            testId={`${pizza.id}-pizza-display-quantity`}
            title={{ value: pizza.name, isKey: false, isFeminin: true }}
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
            {pizza.name || t("pizza-name-unnamed")}
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
            } transition-all ease-out duration-200 ${
              pizzeriaState === "loaded" && "hidden"
            }`}
          >
            <Button
              className="rounded-lg w-8 mr-1"
              color="green"
              onClick={() => handleDoubleClick("name")}
              testId={`${pizza.id}-pizza-display-edit-button`}
              title={t("edit-pizza", { pizza: pizza.name })}
            >
              <Pencil size={20} strokeWidth={2} />
            </Button>
            <Button
              className="rounded-lg w-8"
              color="red"
              onClick={() => dispatch(removePizza(pizza.id))}
              testId={`${pizza.id}-pizza-display-delete-button`}
              title={t("delete-pizza", { pizza: pizza.name })}
            >
              <Trash2 size={20} strokeWidth={2} />
            </Button>
          </div>
        </td>
      </tr>
      {/* Mobile */}
      <div className="relative">
        <div
          style={{
            opacity: opactityCurve(swipePercentage) / 100,
          }}
          className="absolute bg-red-500 w-full h-full rounded-lg flex items-center"
        >
          <Trash2
            size={binSize}
            style={{
              marginLeft: marginLeftCurve(swipePercentage),
            }}
          />
        </div>
        <Swipable
          onSwipeFinish={(value) => {
            if (value >= Math.round((maxSwipe * deleteThreshold) / 100))
              dispatch(removePizza(pizza.id));
          }}
          onSwipeMove={(value) => {
            setSwipePercentage(Math.round(value * 100) / maxSwipe);
          }}
          minSwipe={0}
          maxSwipe={maxSwipe}
          disabled={pizzeriaState === "loaded"}
        >
          <div className="flex w-full flex-col bg-amber-200 rounded-lg overflow-hidden">
            <div className="flex bg-amber-300">
              <div className="flex relative h-8 w-full">
                <div
                  onDoubleClick={() => handleDoubleClick("name")}
                  {...onLongPress(
                    () => {},
                    () => handleDoubleClick("name")
                  )}
                  className="truncate absolute right-0 left-0 font-bold px-2 h-8 py-[2px]"
                  data-testid={`${pizza.id}-pizza-display-name`}
                >
                  {pizza.name || t("pizza-name-unnamed")}
                </div>
              </div>
              <div
                onDoubleClick={() => handleDoubleClick("price")}
                {...onLongPress(
                  () => {},
                  () => handleDoubleClick("price")
                )}
                className="ml-4 mr-2 h-8 pt-[2px] min-w-fit"
              >
                <div data-testid={`${pizza.id}-pizza-display-price`}>
                  {priceToString(pizza.price)} €
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div
                onDoubleClick={() => handleDoubleClick("diet")}
                {...onLongPress(
                  () => {},
                  () => handleDoubleClick("diet")
                )}
                className="my-[2px]"
              >
                <DietDisplay
                  diet={pizza.eatenBy}
                  testId={`${pizza.id}-pizza-display-diet`}
                />
              </div>
              <IntegerInput
                value={pizza.quantity}
                setValue={handleQuantityChange}
                className="min-w-24"
                rounded={false}
                testId={`${pizza.id}-pizza-display-quantity`}
                title={{ value: pizza.name, isKey: false, isFeminin: true }}
              />
            </div>
          </div>
        </Swipable>
      </div>
    </EitherDesktopOrMobile>
  );
}

const a = (100 - opacityRampUpTo) / (opacityFinishedBy - opacityRampUpBy);
const b = opacityRampUpTo - a * opacityRampUpBy;

const bPrime = (2 * opacityRampUpTo) / opacityRampUpBy - a;
const aPrime = (a - bPrime) / opacityRampUpBy;

function opactityCurve(swipePercentage: number): number {
  if (swipePercentage >= opacityFinishedBy) return 100;
  if (swipePercentage > opacityRampUpBy) return a * swipePercentage + b;
  return (
    (aPrime * swipePercentage * swipePercentage) / 2 + bPrime * swipePercentage
  );
}

const binStartMovingPercentage = (binSize * 100) / maxSwipe;
const maxBinMove = (maxSwipe - binSize) / 2;
const aBin = maxBinMove / (100 - binStartMovingPercentage);
const bBin = -(aBin * binStartMovingPercentage);

function marginLeftCurve(swipePercentage: number): number {
  if (swipePercentage < binStartMovingPercentage) return 0;
  return swipePercentage * aBin + bBin;
}
