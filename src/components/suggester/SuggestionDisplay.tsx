import { SuggestedQuantityPerPizza } from "../../services/suggestionService";
import { priceToString } from "../../services/utils";

type SuggestionDisplayProps = {
  pizzas: SuggestedQuantityPerPizza;
};

export function SuggestionDisplay({
  pizzas,
}: Readonly<SuggestionDisplayProps>) {
  if (pizzas === undefined) return <></>;
  const total = Array.from(pizzas).reduce(
    (prev, [pizza, quantity]) => [
      prev[0] + pizza.price * quantity,
      prev[1] + quantity,
    ],
    [0, 0]
  );

  return (
    <div className="bg-white rounded-lg px-2">
      <table className="w-full">
        <thead>
          <tr className="border-b-2">
            <th className="text-left w-1/2">Name</th>
            <th className="text-center w-1/6">Quantity</th>
            <th className="text-right w-2/6">Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(pizzas).map(([pizza, quantity]) => {
            return (
              <tr key={pizza.id} className="w-full">
                <td className="text-left">{pizza.name}</td>
                <td className="text-center">{quantity}</td>
                <td className="text-right">
                  {priceToString(pizza.price * quantity)} €
                </td>
              </tr>
            );
          })}
          <tr className="font-bold border-t-2">
            <td className="text-left">Total</td>
            <td className="text-center">{total[1]}</td>
            <td className="text-right">{priceToString(total[0])} €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
