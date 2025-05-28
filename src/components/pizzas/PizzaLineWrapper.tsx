import { Pizza } from "../../modules/pizzas/slice";
import { createContext, useMemo, useState } from "react";
import { PizzaDisplay } from "./PizzaDisplay";
import { PizzaEdit } from "./PizzaEdit";

type PizzaLineWrapperProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

type EditContext = {
  focus: Focusable;
  setFocus: (value: Focusable) => void;
};
export const EditContext = createContext<EditContext>({
  focus: "name",
  setFocus: () => {},
});

export function PizzaLineWrapper({ pizza }: Readonly<PizzaLineWrapperProps>) {
  const [focus, setFocus] = useState<Focusable>("name");

  const val = useMemo(() => ({ focus, setFocus }), [focus]);

  return (
    <EditContext.Provider value={val}>
      <>
        {!pizza.editable && <PizzaDisplay pizza={pizza} />}
        {pizza.editable && <PizzaEdit pizza={pizza} />}
      </>
    </EditContext.Provider>
  );
}
