import { FilePlus, Save, Store } from "lucide-react";
import { Button } from "../utils/Button";
import { NoVisibleEffectButton } from "../utils/NoVisibleEffectButton";
import { SaveAsIcon } from "../icons/SaveAsIcon";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { SaveAsPizzeriaOverlayContent } from "../pizzeria/SaveAsPizzeriaOverlayContent";
import { ManagePizzeriaOverlayContent } from "../pizzeria/ManagePizzeriaOverlayContent";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadedPizzeriaSelector,
  pizzeriasSelector,
} from "../../modules/pizzerias/selector";
import {
  modifyPizzeria,
  Pizzeria,
  unloadPizzeria,
} from "../../modules/pizzerias/slice";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { setPizzas } from "../../modules/pizzas/slice";
import { useTranslation } from "react-i18next";

export function PizzeriaHotBar() {
  const { t } = useTranslation();
  const pizzas = useSelector(pizzasSelector);
  const [showSaveAsOverlay, setShowSaveAsOverlay] = useState(false);
  const [showLoadOverlay, setShowLoadOverlay] = useState(false);
  const loadedPizzeriaId = useSelector(loadedPizzeriaSelector);
  const pizzerias = useSelector(pizzeriasSelector);
  const dispatch = useDispatch();
  const loadedPizzeria = pizzerias.find(
    (pizzeria) => pizzeria.id === loadedPizzeriaId
  );

  const handleSave = useCallback(() => {
    if (loadedPizzeriaId === undefined || loadedPizzeria === undefined) return;
    const modifiedPizzeria: Pizzeria = {
      id: loadedPizzeriaId,
      name: loadedPizzeria.name,
      pizzas: pizzas,
    };
    dispatch(modifyPizzeria(modifiedPizzeria));
  }, [dispatch, loadedPizzeriaId, pizzas, loadedPizzeria]);

  const handleNew = useCallback(() => {
    dispatch(setPizzas([]));
    dispatch(unloadPizzeria());
  }, [dispatch]);
  return (
    <div
      className={`flex flex-col ${
        loadedPizzeriaId ? "h-[3.5rem]" : "h-[1.75rem]"
      } mb-1`}
    >
      <div className="flex w-full">
        <Button
          color="green"
          onClick={handleNew}
          className="w-full border-t-4 border-l-4 border-r-2 border-green-600 -mt-1 -ml-1 rounded-tl-xl"
          title="New pizzeria"
          testId="pizza-panel-new-pizzeria-button"
        >
          <div className="flex items-center gap-2">
            <FilePlus size={20} strokeWidth={2} />
            <span>{t("new")}</span>
          </div>
        </Button>
        {loadedPizzeriaId && (
          <NoVisibleEffectButton
            color="green"
            onClick={handleSave}
            className="w-full border-t-4 border-x-2 border-green-600 -mt-1"
            title={`Save ${loadedPizzeria?.name}`}
            testId="pizza-panel-save-button"
          >
            <div className="flex items-center gap-2">
              <Save size={20} strokeWidth={2} />
              <span>{t("save")}</span>
            </div>
          </NoVisibleEffectButton>
        )}
        {loadedPizzeriaId === undefined && (
          <Button
            color="green"
            onClick={() => setShowSaveAsOverlay(true)}
            className="w-full border-t-4 border-x-2 border-green-600 -mt-1"
            title="Save pizzeria"
            testId="pizza-panel-save-button"
          >
            <div className="flex items-center gap-2">
              <Save size={20} strokeWidth={2} />
              <span>{t("save")}</span>
            </div>
          </Button>
        )}
        <Button
          color="green"
          onClick={() => {
            setShowSaveAsOverlay(true);
          }}
          className="w-full border-t-4 border-x-2 border-green-600 -mt-1"
          title="Save pizzeria as"
          testId="pizza-panel-save-as-button"
        >
          <div className="flex items-center gap-2">
            <SaveAsIcon
              size={20}
              strokeWidth={2}
              backgroundColor="bg-green-500"
            />
            <span>{t("save-as")}</span>
          </div>
        </Button>
        <Button
          color="green"
          onClick={() => {
            setShowLoadOverlay(true);
          }}
          className="w-full border-t-4 border-l-2 border-r-4 border-green-600 -mt-1 -mr-1 rounded-tr-xl"
          title="Load and manage pizzeria"
          testId="pizza-panel-manage-button"
        >
          <div className="flex items-center gap-2">
            <Store size={20} strokeWidth={2} />
            <span>{t("manage-pizzeria-button")}</span>
          </div>
        </Button>
      </div>
      {loadedPizzeriaId && (
        <div className="w-full bg-amber-200 h-7">
          <span
            className="text-left font-bold w-[700px] px-4 truncate"
            data-testid="pizza-panel-pizzeria-name"
          >
            {loadedPizzeria?.name}
          </span>
        </div>
      )}
      <OverlayWrapper
        show={showSaveAsOverlay}
        close={() => setShowSaveAsOverlay(false)}
        testId="save-as-overlay"
      >
        <SaveAsPizzeriaOverlayContent />
      </OverlayWrapper>
      <OverlayWrapper
        show={showLoadOverlay}
        close={() => setShowLoadOverlay(false)}
        testId="manage-overlay"
      >
        <ManagePizzeriaOverlayContent />
      </OverlayWrapper>
    </div>
  );
}
