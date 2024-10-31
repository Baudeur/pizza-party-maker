import { useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzaForm } from "./PizzaForm";
import { Container } from "../utils/Container";
import { PizzaLineWrapper } from "./PizzaLineWrapper";
import { Button } from "../utils/Button";
import { Store } from "lucide-react";
import { OverlayWrapper } from "../utils/OverlayWrapper";
import { useState } from "react";
import { PizzeriaOverlayContent } from "../pizzeria/PizzeriaOverlayContent";

export function Pizzas() {
  const pizzas = useSelector(pizzasSelector);
  const [showSaveOverlay, setShowSaveOverlay] = useState(false);
  return (
    <Container className="text-xl flex ml-4 mb-4 h-96" testId="pizza-panel">
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
            <th className="w-[10%] pb-2">
              <div className="flex w-full pl-2">
                <Button
                  color="green"
                  onClick={() => {
                    setShowSaveOverlay(true);
                  }}
                  className="w-full rounded-lg"
                  title="Save pizzeria"
                >
                  <Store size={20} strokeWidth={2} />
                </Button>
              </div>
            </th>
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
        show={showSaveOverlay}
        close={() => setShowSaveOverlay(false)}
      >
        <PizzeriaOverlayContent />
      </OverlayWrapper>
    </Container>
  );
}
