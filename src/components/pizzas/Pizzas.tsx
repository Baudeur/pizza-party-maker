import { useDispatch, useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { PizzaDisplay } from "./PizzaDisplay";
import { PizzaForm } from "./PizzaForm";
import { addPizza } from "../../modules/pizzas/slice";
import { Container } from "../utils/Container";

export function Pizzas() {
  const pizzas = useSelector(pizzasSelector);
  const dispatch = useDispatch();
  return (
    <Container className="text-xl flex ml-4 mb-4 h-96">
      <table className="block overflow-y-auto w-[640px]">
        <thead className="sticky top-0 bg-gradient-to-b from-amber-100 from-85% to-transparent z-10">
          <tr>
            <th className="w-5/12 text-left pl-2 pb-2">Name</th>
            <th className="w-3/12 pb-2 text-left pl-2">Eaten by</th>
            <th className="w-2/12 text-right pr-2 pb-2">Price</th>
            <th className="w-2/12 pb-2"></th>
          </tr>
        </thead>
        <tbody className="overflow-auto">
          {pizzas.map((pizzaElem) => {
            return <PizzaDisplay key={pizzaElem.id} pizza={pizzaElem} />;
          })}
        </tbody>
        <tfoot className="sticky bottom-0 bg-gradient-to-t from-amber-100 from-85% to-transparent">
          <PizzaForm onPizzaCreate={(pizza) => dispatch(addPizza(pizza))} />
        </tfoot>
      </table>
    </Container>
  );
}
