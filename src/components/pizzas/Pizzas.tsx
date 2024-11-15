import { useDispatch, useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzaForm } from "./PizzaForm";
import { Container } from "../utils/Container";
import { PizzaLineWrapper } from "./PizzaLineWrapper";
import { Button } from "../utils/Button";
import { Save, Store } from "lucide-react";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { useCallback, useState } from "react";
import { ManagePizzeriaOverlayContent } from "../pizzeria/ManagePizzeriaOverlayContent";
import { SaveAsIcon } from "../icons/SaveAsIcon";
import { SaveAsPizzeriaOverlayContent } from "../pizzeria/SaveAsPizzeriaOverlayContent";
import {
  loadedPizzeriaSelector,
  pizzeriasSelector,
} from "../../modules/pizzerias/selector";
import { modifyPizzeria, Pizzeria } from "../../modules/pizzerias/slice";
import { NoVisibleEffectButton } from "../utils/NoVisibleEffectButton";

export function Pizzas() {
  const pizzas = useSelector(pizzasSelector);
  const [showSaveAsOverlay, setShowSaveAsOverlay] = useState(false);
  const [showLoadOverlay, setShowLoadOverlay] = useState(false);
  const loadedPizzeriaId = useSelector(loadedPizzeriaSelector);
  const pizzerias = useSelector(pizzeriasSelector);
  const dispatch = useDispatch();

  const handleSave = useCallback(() => {
    const loadedPizzeria = pizzerias.find(
      (pizzeria) => pizzeria.id === loadedPizzeriaId
    );
    if (loadedPizzeriaId === undefined || loadedPizzeria === undefined) return;
    const modifiedPizzeria: Pizzeria = {
      id: loadedPizzeriaId,
      name: loadedPizzeria.name,
      pizzas: pizzas,
    };
    dispatch(modifyPizzeria(modifiedPizzeria));
  }, [dispatch, loadedPizzeriaId, pizzas, pizzerias]);

  return (
    <Container
      className="text-xl flex flex-col ml-4 mb-4 h-96"
      testId="pizza-panel"
    >
      <div className="">
        <div className="flex w-full gap-2 mb-2">
          {loadedPizzeriaId && (
            <NoVisibleEffectButton
              color="green"
              onClick={handleSave}
              className="w-16 rounded-lg"
              title="Save pizzeria"
            >
              <Save size={20} strokeWidth={2} />
            </NoVisibleEffectButton>
          )}
          {loadedPizzeriaId === undefined && (
            <Button
              color="green"
              onClick={() => setShowSaveAsOverlay(true)}
              className="w-16 rounded-lg"
              title="Save pizzeria"
            >
              <Save size={20} strokeWidth={2} />
            </Button>
          )}
          <Button
            color="green"
            onClick={() => {
              setShowSaveAsOverlay(true);
            }}
            className="w-16 rounded-lg"
            title="Save pizzeria"
          >
            <SaveAsIcon size={20} strokeWidth={2} />
          </Button>
          <Button
            color="green"
            onClick={() => {
              setShowLoadOverlay(true);
            }}
            className="w-16 rounded-lg"
            title="Save pizzeria"
          >
            <Store size={20} strokeWidth={2} />
          </Button>
        </div>
      </div>
      <table className="block overflow-y-auto w-[750px]">
        <thead
          className="sticky top-0 bg-gradient-to-b from-amber-100 from-85% to-transparent z-10"
          data-testid="pizza-header"
        >
          <tr>
            <th className="w-[15%] text-left pl-2 pb-2">Quantity</th>
            <th className="w-[40%] text-left pl-2 pb-2">Name</th>
            <th className="w-[20%] pb-2 text-left pl-2">Eaten by</th>
            <th className="w-[15%] text-right pr-2 pb-2">Price</th>
            <th className="w-[10%] pb-2"></th>
          </tr>
        </thead>
        <tbody className="overflow-auto" data-testid="pizza-list">
          {pizzas.map((pizzaElem) => {
            return <PizzaLineWrapper key={pizzaElem.id} pizza={pizzaElem} />;
          })}
        </tbody>
        <tfoot
          className="sticky bottom-0 bg-gradient-to-t from-amber-100 from-85% to-transparent z-10"
          data-testid="pizza-footer"
        >
          <PizzaForm />
        </tfoot>
      </table>
      <OverlayWrapper
        show={showSaveAsOverlay}
        close={() => setShowSaveAsOverlay(false)}
      >
        <SaveAsPizzeriaOverlayContent />
      </OverlayWrapper>
      <OverlayWrapper
        show={showLoadOverlay}
        close={() => setShowLoadOverlay(false)}
      >
        <ManagePizzeriaOverlayContent />
      </OverlayWrapper>
    </Container>
  );
}
