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
import { useTranslation } from "react-i18next";

export function SaveAsPizzeriaOverlayContent() {
  const { t } = useTranslation();
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
    if (nameConflict === undefined) return;
    setNameConflict(undefined);
    setName("");
  }, [nameConflict]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") handleOverride();
    if (event.key == "Escape") handleCancel();
  };

  useEffect(() => {
    if (nameConflict === undefined) {
      inputRef.current?.focus();
      removeEventListener("keydown", handleKeyPress);
    } else {
      addEventListener("keydown", handleKeyPress);
    }
    return () => removeEventListener("keydown", handleKeyPress);
  }, [nameConflict]);

  return (
    <div className="w-[500px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-2 text-center w-full">
        {t("save-pizzeria-as-title")}
      </p>
      {nameConflict === undefined && (
        <div className="flex justify-between w-full items-center gap-2 mt-2">
          <div
            className="flex gap-2 w-full"
            onKeyDown={(event) => {
              if (event.key === "Enter") handleCreatePizzeria();
              event.stopPropagation();
            }}
          >
            <TextInput
              placeholder={t("save-pizzeria-name")}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full"
              ref={inputRef}
              testId="save-as-pizzeria-text-input"
            />
            <Button
              color="green"
              onClick={handleCreatePizzeria}
              className="min-w-[68px] rounded-lg"
              testId="save-as-pizzeria-save-button"
              title="Save"
            >
              <Save size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>
      )}
      {nameConflict !== undefined && (
        <div className="w-full flex flex-col text-lg">
          <span className="text-red-500 mb-2">
            {t("save-pizzeria-name-conflict")}
          </span>
          <PizzeriaDisplayer pizzeria={nameConflict} className="max-h-48" />
          <div className="flex w-full gap-2 mt-2">
            <Button
              onClick={handleCancel}
              color="yellow"
              className="rounded-lg w-full"
              testId="save-as-conflict-cancel"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleOverride}
              color="green"
              className="rounded-lg w-full"
              testId="save-as-conflict-override"
            >
              {t("save-pizzeria-override")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
