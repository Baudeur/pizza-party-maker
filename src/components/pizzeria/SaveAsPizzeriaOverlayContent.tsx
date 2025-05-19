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
import { CloseContext } from "../utils/OverlayInside";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

export function SaveAsPizzeriaOverlayContent() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();
  const [name, setName] = useState("");
  const pizzerias = useSelector(pizzeriasSelector);
  const pizzas = useSelector(pizzasSelector);
  const [nameConflict, setNameConflict] = useState<Pizzeria | undefined>(
    undefined
  );
  const close = useContext(CloseContext);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

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
    <div className={isDesktop ? "w-[500px]" : ""}>
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
              title={t("pizzeria-name")}
            />
            <Button
              color="green"
              onClick={handleCreatePizzeria}
              className="min-w-[68px] rounded-lg"
              testId="save-as-pizzeria-save-button"
              title={t("save")}
            >
              <Save size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>
      )}
      {nameConflict !== undefined && (
        <div
          className="w-full flex flex-col text-lg"
          data-testid="save-as-conflict-already-exists"
        >
          <span className="text-red-500 text-xl mb-2">
            <Trans
              i18nKey={"save-pizzeria-name-conflict"}
              components={{
                pizzeriaName: <span>{nameConflict.name}</span>,
              }}
            />
          </span>
          <span
            className="text-left px-2 font-bold"
            data-testid="save-as-conflict-content-of"
          >
            <Trans
              i18nKey={"save-pizzeria-content-of"}
              components={{
                pizzeriaName: <span>{nameConflict.name}</span>,
              }}
            />
          </span>
          <PizzeriaDisplayer
            pizzeria={nameConflict}
            className="max-h-48"
            testId="conflict"
          />
          <div className="flex w-full gap-2 mt-2">
            <Button
              onClick={handleCancel}
              color="orange"
              className="rounded-lg w-full"
              testId="save-as-conflict-cancel"
              title={t("cancel")}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleOverride}
              color="green"
              className="rounded-lg w-full"
              testId="save-as-conflict-override"
              title={t("save-pizzeria-override")}
            >
              {t("save-pizzeria-override")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
