import { Save } from "lucide-react";
import { TextInput } from "../utils/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { pizzeriasSelector } from "../../modules/pizzerias/selector";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  addPizzeria,
  modifyPizzeria,
  Pizzeria,
  PizzeriaWithoutID,
} from "../../modules/pizzerias/slice";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { Button } from "../utils/Button";
import { PizzeriaDisplayer } from "./PizzeriaDisplayer";
import { CloseContext } from "../utils/Overlay";

export function SaveAsPizzeriaOverlayContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const pizzerias = useSelector(pizzeriasSelector);
  const pizzas = useSelector(pizzasSelector);
  const [nameConflict, setNameConflict] = useState<Pizzeria | undefined>(
    undefined
  );
  const close = useContext(CloseContext);

  function handleCreatePizzeria() {
    const newPizzeria: PizzeriaWithoutID = {
      name,
      pizzas: pizzas,
    };
    const nameConflictPizzeria = pizzerias.find(
      (pizzeria) => pizzeria.name === name
    );
    if (nameConflictPizzeria !== undefined) {
      setNameConflict(nameConflictPizzeria);
    } else {
      dispatch(addPizzeria(newPizzeria));
      close();
    }
  }

  const handleOverride = useCallback(() => {
    if (nameConflict === undefined) return;
    const newPizzeria: Pizzeria = {
      id: nameConflict.id,
      name: nameConflict.name,
      pizzas: pizzas,
    };
    dispatch(modifyPizzeria(newPizzeria));
    close();
  }, [close, nameConflict, dispatch, pizzas]);

  const handleCancel = useCallback(() => {
    setNameConflict(undefined);
    setName("");
  }, []);

  useEffect(() => {
    if (nameConflict === undefined) inputRef.current?.focus();
  }, [nameConflict]);

  return (
    <div className="w-[500px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-2 text-center w-full">
        Save pizzeria as...
      </p>
      {nameConflict === undefined && (
        <div className="flex justify-between w-full items-center gap-2 mt-2">
          <div
            className="flex gap-2 w-full"
            onKeyDown={(event) => {
              if (event.key === "Enter") handleCreatePizzeria();
            }}
          >
            <TextInput
              placeholder="Name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full"
              ref={inputRef}
            />
            <Button
              color="green"
              onClick={handleCreatePizzeria}
              className="min-w-[68px] rounded-lg"
            >
              <Save size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>
      )}
      {nameConflict !== undefined && (
        <div className="w-full flex flex-col text-lg">
          <span className="text-red-500 mb-2">
            A pizzeria with this name already exists, override ?
          </span>
          <PizzeriaDisplayer pizzeria={nameConflict} className="max-h-48" />
          <div className="flex w-full gap-2 mt-2">
            <Button
              onClick={handleCancel}
              color="yellow"
              className="rounded-lg w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOverride}
              color="green"
              className="rounded-lg w-full"
            >
              Override
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
