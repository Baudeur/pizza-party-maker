import { useTranslation } from "react-i18next";
import { Pizzeria } from "../../modules/pizzerias/slice";
import { DietIcon } from "../icons/DietIcon";

type PizzeriaDisplayerProps = {
  pizzeria: Pizzeria;
  testId: string;
  className?: string;
};

export function PizzeriaDisplayer({
  pizzeria,
  testId,
  className,
}: Readonly<PizzeriaDisplayerProps>) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col gap-1 overflow-y-auto my-2 rounded-lg p-1 bg-amber-200 ${className}`}
      data-testid={`${testId}-displayer-pizza-list`}
    >
      {pizzeria.pizzas.length === 0 && <div>{t("pizzeria-no-pizza")}</div>}
      {pizzeria.pizzas.map((pizza) => (
        <div key={pizza.id} className="w-full flex bg-white rounded-lg px-2">
          <div
            className="w-1/2 text-left truncate"
            title={pizza.name}
            data-testid={`${testId}-displayer-pizza-${pizza.id}-name`}
          >
            {pizza.name}
          </div>
          <div className="w-1/6 flex justify-center items-center">
            <DietIcon
              type={pizza.eatenBy}
              color="Color"
              className="size-6"
              testId={`${testId}-displayer-pizza-${pizza.id}`}
            />
          </div>
          <div
            className="w-2/6 text-right"
            data-testid={`${testId}-displayer-pizza-${pizza.id}-price`}
          >
            {pizza.price} €
          </div>
        </div>
      ))}
    </div>
  );
}
