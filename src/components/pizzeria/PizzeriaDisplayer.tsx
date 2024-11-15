import { Pizzeria } from "../../modules/pizzerias/slice";
import { DietIcon } from "../icons/DietIcon";

type PizzeriaDisplayerProps = {
  pizzeria: Pizzeria;
  className?: string;
};

export function PizzeriaDisplayer({
  pizzeria,
  className,
}: Readonly<PizzeriaDisplayerProps>) {
  return (
    <div
      className={`${className} flex flex-col border-2 rounded-lg border-black p-1 bg-amber-200`}
    >
      <div
        className="text-xl font-bold pl-2 mb-2 underline text-left truncate h-10 w-80"
        title={pizzeria.name}
      >
        {pizzeria.name !== "" ? pizzeria.name : "(unnamed)"}
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto">
        {pizzeria.pizzas.map((pizza) => (
          <div key={pizza.id} className="w-full flex bg-white rounded-lg px-2">
            <div className="w-3/6 text-left truncate" title={pizza.name}>
              {pizza.name}
            </div>
            <div className="w-1/6 flex justify-center items-center">
              <DietIcon type={pizza.eatenBy} color="Color" className="size-6" />{" "}
            </div>
            <div className="w-2/6 text-right">{pizza.price} €</div>
          </div>
        ))}
      </div>
    </div>
  );
}
