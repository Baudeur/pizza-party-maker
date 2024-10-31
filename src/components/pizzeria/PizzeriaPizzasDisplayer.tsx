import { ChevronDown } from "lucide-react";
import { Pizza } from "../../modules/pizzas/slice";
import { useEffect, useRef, useState } from "react";

type PizzeriaPizzasDisplayerProps = {
  pizzas: Pizza[];
};

export function PizzeriaPizzasDisplayer({
  pizzas,
}: Readonly<PizzeriaPizzasDisplayerProps>) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent) => {
    const { pageX: x, pageY: y } = event;
    const bounds = ref.current?.getBoundingClientRect();
    if (bounds === undefined) return;
    if (
      y > bounds.y &&
      y < bounds.y + bounds.height &&
      x > bounds.x &&
      x < bounds.x + bounds.width
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    addEventListener("mousemove", handleMove);
    return () => removeEventListener("mousemove", handleMove);
  }, []);
  return (
    <div ref={ref}>
      <div className="bg-white flex items-center justify-between px-2 rounded-lg relative w-[300px] h-8">
        <span className="w-[220px] text-left truncate">{pizzas[0].name}</span>
        <span className="w-24 text-right">{pizzas[0].price} €</span>
        <ChevronDown size={20} strokeWidth={2} className="ml-2" />
      </div>
      {show && (
        <div className="absolute bg-white rounded-lg px-2 w-[300px] max-h-32 overflow-auto -translate-y-8 z-10">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="w-full flex h-8 justify-between items-center pr-2"
            >
              <span className="w-[249px] text-left truncate">{pizza.name}</span>
              <span className="w-24 text-right">{pizza.price} €</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
