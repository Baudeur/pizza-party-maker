import { Pizza } from "../../modules/pizzas/slice";
import { createContext, useMemo, useState } from "react";
import { PizzaDisplay } from "./PizzaDisplay";
import { PizzaEdit } from "./PizzaEdit";

type PizzaLineWrapperProps = {
  pizza: Pizza;
};

type Focusable = "name" | "diet" | "price";

type EditContext = {
  editable: boolean;
  setEditable: (value: boolean) => void;
  focus: Focusable;
  setFocus: (value: Focusable) => void;
};
export const EditContext = createContext<EditContext>({
  editable: false,
  setEditable: () => {},
  focus: "name",
  setFocus: () => {},
});

export function PizzaLineWrapper({ pizza }: Readonly<PizzaLineWrapperProps>) {
  const [editable, setEditable] = useState(false);
  const [focus, setFocus] = useState<Focusable>("name");

  const val = useMemo(
    () => ({ editable, setEditable, focus, setFocus }),
    [editable, focus]
  );

  return (
    <EditContext.Provider value={val}>
      <>
        {!editable && <PizzaDisplay pizza={pizza} />}
        {editable && <PizzaEdit pizza={pizza} />}
      </>
    </EditContext.Provider>
  );
}
