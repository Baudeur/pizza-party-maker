import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { useSelector } from "react-redux";
import { pizzeriaStateSelector } from "../../modules/pizzerias/selector";

export function PizzaPlaceholder() {
  const { t } = useTranslation();
  const pizzeriaState = useSelector(pizzeriaStateSelector);

  return (
    <EitherDesktopOrMobile>
      <tr data-testid="pizza-form">
        <td colSpan={5}>
          <div className="bg-amber-200 px-3 rounded-lg">
            <span className="text-lg">
              {pizzeriaState === "nothing"
                ? t("no-pizza")
                : t("pizzeria-no-pizza")}
            </span>
          </div>
        </td>
      </tr>
      <div className="bg-amber-200 px-3 rounded-lg">
        <span className="text-lg">
          {pizzeriaState === "nothing" ? t("no-pizza") : t("pizzeria-no-pizza")}
        </span>
      </div>
    </EitherDesktopOrMobile>
  );
}
