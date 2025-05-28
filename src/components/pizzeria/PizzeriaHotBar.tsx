import { ArrowLeftToLine, Pencil, Save, Store, X } from "lucide-react";
import { Button } from "../utils/Button";
import { SaveAsIcon } from "../icons/SaveAsIcon";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  loadedPizzeriaSelector,
  pizzeriasSelector,
  pizzeriaStateSelector,
} from "../../modules/pizzerias/selector";
import {
  editPizzeria,
  loadPizzeria,
  modifyPizzeria,
  Pizzeria,
  unloadPizzeria,
} from "../../modules/pizzerias/slice";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { useAppDispatch } from "../../hooks";
import { openOverlay } from "../../modules/overlays/slice";
import { Desktop, EitherDesktopOrMobile } from "../utils/ReactiveComponents";

export function PizzeriaHotBar() {
  const { t } = useTranslation();
  const pizzas = useSelector(pizzasSelector);
  const loadedPizzeriaId = useSelector(loadedPizzeriaSelector);
  const pizzerias = useSelector(pizzeriasSelector);
  const dispatch = useAppDispatch();
  const loadedPizzeria = pizzerias.find(
    (pizzeria) => pizzeria.id === loadedPizzeriaId
  );
  const pizzeriaState = useSelector(pizzeriaStateSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const handleSave = useCallback(() => {
    if (loadedPizzeriaId === undefined || loadedPizzeria === undefined) return;
    const modifiedPizzeria: Pizzeria = {
      id: loadedPizzeriaId,
      name: loadedPizzeria.name,
      pizzas: pizzas,
    };
    dispatch(modifyPizzeria(modifiedPizzeria));
  }, [dispatch, loadedPizzeriaId, pizzas, loadedPizzeria]);

  const handleExit = useCallback(() => {
    dispatch(unloadPizzeria());
  }, [dispatch]);
  return (
    <div className={`flex flex-col mb-2 ${isDesktop && "-mt-1"}`}>
      <div
        className={`flex w-full gap-2 ${pizzeriaState !== "nothing" && "mb-1"}`}
      >
        {pizzeriaState === "loaded" && (
          <Button
            color="yellow"
            onClick={handleExit}
            className={`w-1/3 rounded-lg`}
            title={t("exit-pizzeria")}
            testId="pizza-panel-exit-button"
          >
            <div className="flex items-center gap-2">
              <ArrowLeftToLine size={20} strokeWidth={2} />
              <Desktop>
                <span>{t("exit-pizzeria")}</span>
              </Desktop>
            </div>
          </Button>
        )}
        {pizzeriaState === "editing" && (
          <Button
            color="yellow"
            onClick={() => {
              if (loadedPizzeria === undefined) return;
              dispatch(loadPizzeria(loadedPizzeria.id));
            }}
            className={`w-1/3 rounded-lg`}
            title={t("cancel")}
            testId="pizza-panel-cancel-button"
          >
            <div className="flex items-center gap-2">
              <X size={20} strokeWidth={2} />
              <Desktop>
                <span>{t("cancel")}</span>
              </Desktop>
            </div>
          </Button>
        )}
        {pizzeriaState === "editing" && (
          <Button
            color="yellow"
            onClick={handleSave}
            className={`w-1/3 rounded-lg`}
            title={t("save-pizzeria", { pizzeriaName: loadPizzeria.name })}
            testId="pizza-panel-save-button"
          >
            <div className="flex items-center gap-2">
              <Save size={20} strokeWidth={2} />
              <Desktop>
                <span>{t("save")}</span>
              </Desktop>
            </div>
          </Button>
        )}
        {pizzeriaState === "nothing" && (
          <Button
            color="yellow"
            onClick={() => {
              dispatch(openOverlay("SAVE_PIZZERIA"));
            }}
            className={`w-2/3 rounded-lg`}
            title={t("save-as-pizzeria")}
            testId="pizza-panel-save-as-button"
          >
            <div className="flex items-center gap-2">
              <SaveAsIcon
                size={20}
                strokeWidth={2}
                backgroundColor="bg-amber-300"
              />
              <EitherDesktopOrMobile>
                <span>{t("save-as-pizzeria")}</span>
                <span>{t("save")}</span>
              </EitherDesktopOrMobile>
            </div>
          </Button>
        )}
        {pizzeriaState == "loaded" && (
          <Button
            color="yellow"
            onClick={() => {
              dispatch(editPizzeria());
            }}
            className={`w-1/3 rounded-lg`}
            title={t("edit-pizzeria")}
            testId="pizza-panel-edit-button"
          >
            <div className="flex items-center gap-2">
              <Pencil size={20} strokeWidth={2} />
              <Desktop>
                <span>{t("edit-pizzeria")}</span>
              </Desktop>
            </div>
          </Button>
        )}
        <Button
          color="yellow"
          onClick={() => {
            dispatch(openOverlay("MANAGE_PIZZERIA"));
          }}
          className={`w-1/3 rounded-lg`}
          title={t("manage-pizzeria-title")}
          testId="pizza-panel-manage-button"
        >
          <div className="flex items-center gap-2">
            <Store size={20} strokeWidth={2} />
            <Desktop>
              <span>{t("manage-pizzeria-button")}</span>
            </Desktop>
          </div>
        </Button>
      </div>
      {loadedPizzeriaId && (
        <div className="w-full bg-amber-200 h-7 rounded-lg relative">
          <span
            className="absolute right-0 left-0 text-left font-bold px-4 truncate"
            data-testid="pizza-panel-pizzeria-name"
          >
            {loadedPizzeria?.name}
          </span>
        </div>
      )}
    </div>
  );
}
