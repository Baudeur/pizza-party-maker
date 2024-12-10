import { useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzaForm } from "./PizzaForm";
import { Container } from "../utils/Container";
import { PizzaLineWrapper } from "./PizzaLineWrapper";
import { PizzeriaHotBar } from "./PizzeriaHotBar";
import { loadedPizzeriaSelector } from "../../modules/pizzerias/selector";
import { useTranslation } from "react-i18next";

export function Pizzas() {
  const { t } = useTranslation();
  const pizzas = useSelector(pizzasSelector);
  const loadedPizzaId = useSelector(loadedPizzeriaSelector);

  return (
    <Container
      className="text-xl ml-4 mb-4 h-[27rem]"
      testId="pizza-panel"
      header={<PizzeriaHotBar />}
    >
      <table
        className={`block overflow-y-auto w-[750px] ${
          loadedPizzaId ? "h-[21.75rem]" : "h-[23.5rem]"
        }`}
      >
        <thead
          className="sticky top-0 bg-gradient-to-b from-amber-100 from-85% to-transparent z-10"
          data-testid="pizza-header"
        >
          <tr>
            <th className="w-[15%] text-left pl-2 pb-2">
              {t("pizza-table-quantity")}
            </th>
            <th className="w-[40%] text-left pl-2 pb-2">
              {t("pizza-table-name")}
            </th>
            <th className="w-[20%] pb-2 text-left pl-2">
              {t("pizza-table-eaten-by")}
            </th>
            <th className="w-[15%] text-right pr-2 pb-2">
              {t("pizza-table-price")}
            </th>
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
    </Container>
  );
}
