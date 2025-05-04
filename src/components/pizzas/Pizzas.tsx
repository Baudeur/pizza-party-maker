import { useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzaForm } from "./PizzaForm";
import { Container } from "../utils/Container";
import { PizzaLineWrapper } from "./PizzaLineWrapper";
import { PizzeriaHotBar } from "../pizzeria/PizzeriaHotBar";
import { pizzeriaStateSelector } from "../../modules/pizzerias/selector";
import { useTranslation } from "react-i18next";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { PizzaPlaceholder } from "./PizzaPlaceholder";

export function Pizzas() {
  const { t } = useTranslation();
  const pizzas = useSelector(pizzasSelector);
  const pizzeriaState = useSelector(pizzeriaStateSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  return (
    <Container
      className={`${
        isDesktop
          ? "h-[32rem]"
          : "rounded-none border-none overflow-y-hidden overflow-x-hidden"
      } text-xl`}
      testId="pizza-panel"
      fullHeight={!isDesktop}
    >
      <Desktop>
        <PizzeriaHotBar />
        <div
          className={`overflow-y-auto w-[750px] ${
            pizzeriaState === "nothing"
              ? "max-h-[27.50rem]"
              : "max-h-[25.50rem]"
          }`}
        >
          <table className="w-full">
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
                <th className="w-[20%] text-left pl-2 pb-2">
                  {t("pizza-table-eaten-by")}
                </th>
                <th className="w-[15%] text-right pr-2 pb-2">
                  {t("pizza-table-price")}
                </th>
                <th className="w-[10%] pb-2"></th>
              </tr>
            </thead>
            <tbody className="overflow-auto" data-testid="pizza-list">
              {pizzas.length > 0 ? (
                <>
                  {pizzas.map((pizzaElem) => {
                    return (
                      <PizzaLineWrapper key={pizzaElem.id} pizza={pizzaElem} />
                    );
                  })}
                </>
              ) : (
                <PizzaPlaceholder />
              )}
            </tbody>
            <tfoot
              className="sticky bottom-0 bg-gradient-to-t from-amber-100 from-85% to-transparent z-10"
              data-testid="pizza-footer"
            >
              <PizzaForm />
            </tfoot>
          </table>
        </div>
      </Desktop>
      <Mobile>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="w-full z-[11]">
            <PizzeriaHotBar />
          </div>
          <div
            className={`flex flex-col overflow-y-auto overflow-x-hidden h-fit`}
          >
            <div className="sticky top-0 w-full z-10 min-h-2 bg-gradient-to-b from-amber-100 from-0% to-transparent" />

            <div className="flex flex-col gap-5">
              {pizzas.length > 0 ? (
                <>
                  {pizzas.map((pizzaElem) => {
                    return (
                      <PizzaLineWrapper key={pizzaElem.id} pizza={pizzaElem} />
                    );
                  })}
                </>
              ) : (
                <PizzaPlaceholder />
              )}
            </div>
            <div className="sticky mt-auto bottom-0 w-full z-10 min-h-2 bg-gradient-to-t from-amber-100 from-0% to-transparent" />
          </div>

          <div className="w-full z-10 pb-2">
            <PizzaForm />
          </div>
        </div>
      </Mobile>
    </Container>
  );
}
