import { addPizza, PizzaWithoutID } from "../../modules/pizzas/slice";
import { Button } from "../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { pizzasEditableSelector } from "../../modules/pizzas/selector";

export function PizzaForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editable = useSelector(pizzasEditableSelector);

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
            testId="pizza-form-submit"
            title="Add pizza"
            disabled={!editable}
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
          testId="pizza-form-submit"
          title="Add pizza"
          disabled={!editable}
        >
          {t("add-pizza")}
        </Button>
      </div>
    </EitherDesktopOrMobile>
  );
}
