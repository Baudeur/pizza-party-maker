import { useTranslation } from "react-i18next";
import { SuggestedQuantityPerPizza } from "../../services/suggestionService";
import { priceToString } from "../../services/utils";

type SuggestionDisplayProps = {
  pizzas: SuggestedQuantityPerPizza;
};

export function SuggestionDisplay({
  pizzas,
}: Readonly<SuggestionDisplayProps>) {
  const { t } = useTranslation();
  if (pizzas === undefined) return <></>;
  const total = Array.from(pizzas).reduce(
    (prev, [pizza, quantity]) => [
      prev[0] + pizza.price * quantity,
      prev[1] + quantity,
    ],
    [0, 0]
  );

  return (
    <div className="bg-white rounded-lg px-2" data-testid="suggestion">
      <table className="w-full">
        <thead>
          <tr className="border-b-2">
            <th className="text-left w-1/2">{t("pizza-table-name")}</th>
            <th className="text-center w-1/6">{t("pizza-table-quantity")}</th>
            <th className="text-right w-2/6">{t("pizza-table-price")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(pizzas).map(([pizza, quantity]) => {
            return (
              <tr
                key={pizza.id}
                className="w-full"
                data-testid={`suggestion-line-${pizza.id}`}
              >
                <td className="text-left">{pizza.name}</td>
                <td className="text-center">{quantity}</td>
                <td className="text-right">
                  {priceToString(pizza.price * quantity)} €
                </td>
              </tr>
            );
          })}
          <tr className="font-bold border-t-2" data-testid="suggestion-total">
            <td className="text-left">{t("suggester-suggestion-total")}</td>
            <td className="text-center" data-testid="suggestion-total-quantity">
              {total[1]}
            </td>
            <td className="text-right" data-testid="suggestion-total-price">
              {priceToString(total[0])} €
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
