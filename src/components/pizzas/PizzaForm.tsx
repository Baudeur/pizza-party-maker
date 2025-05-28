import { addPizza, PizzaWithoutID } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { pizzeriaStateSelector } from "../../modules/pizzerias/selector";

export function PizzaForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pizzeriaState = useSelector(pizzeriaStateSelector);

  const handleSubmit = () => {
    const pizza: PizzaWithoutID = {
      name: "",
      eatenBy: "normal",
      price: 0,
      quantity: 1,
      editable: true,
    };
    dispatch(addPizza(pizza));
  };

  return (
    <EitherDesktopOrMobile>
      <tr data-testid="pizza-form">
        <td colSpan={5}>
          <Button
            tabIndex={0}
            className={"rounded-lg w-full mt-4"}
            color={"green"}
            onClick={handleSubmit}
            testId="add-pizza-button"
            title={t("add-pizza")}
            disabled={pizzeriaState === "loaded"}
          >
            {t("add-pizza")}
          </Button>
        </td>
      </tr>
      <div>
        <Button
          tabIndex={0}
          className={"rounded-lg w-full"}
          color={"green"}
          onClick={handleSubmit}
          testId="add-pizza-button"
          title={t("add-pizza")}
          disabled={pizzeriaState === "loaded"}
        >
          {t("add-pizza")}
        </Button>
      </div>
    </EitherDesktopOrMobile>
  );
}
