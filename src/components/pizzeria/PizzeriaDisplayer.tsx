import { Pizzeria } from "../../modules/pizzerias/slice";
import { DietIcon } from "../icons/DietIcon";

type PizzeriaDisplayerProps = {
  pizzeria: Pizzeria;
  className?: string;
  testId?: string;
};

export function PizzeriaDisplayer({
  pizzeria,
  className,
  testId,
}: Readonly<PizzeriaDisplayerProps>) {
  return (
    <div
      className={`${className} flex flex-col border-2 rounded-lg border-black p-1 bg-amber-200`}
    >
      <div
        className="text-xl font-bold pl-2 mb-2 underline text-left truncate h-10 w-80"
        title={pizzeria.name}
        data-testid={`${testId}-pizzeria-name`}
      >
        {pizzeria.name !== "" ? pizzeria.name : "(unnamed)"}
      </div>
      <div
        className="flex flex-col gap-1 overflow-y-auto"
        data-testid={`${testId}-pizzeria-pizza-list`}
      >
        {pizzeria.pizzas.map((pizza) => (
          <div key={pizza.id} className="w-full flex bg-white rounded-lg px-2">
            <div
              className="w-3/6 text-left truncate"
              title={pizza.name}
              data-testid={`${testId}-pizzeria-pizza-${pizza.id}-name`}
            >
              {pizza.name}
            </div>
            <div className="w-1/6 flex justify-center items-center">
              <DietIcon
                type={pizza.eatenBy}
                color="Color"
                className="size-6"
                testId={`${testId}-pizzeria-pizza-${pizza.id}`}
              />
            </div>
            <div
              className="w-2/6 text-right"
              data-testid={`${testId}-pizzeria-pizza-${pizza.id}-price`}
            >
              {pizza.price} €
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
