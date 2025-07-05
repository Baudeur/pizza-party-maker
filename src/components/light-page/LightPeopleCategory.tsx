import { useDispatch, useSelector } from "react-redux";
import { Diet, dietTranslationMap } from "../../types";
import { peopleDietSelector } from "../../modules/people/selector";
import { useTranslation } from "react-i18next";
import { setNumber } from "../../modules/people/slice";
import { DietIcon } from "../icons/DietIcon";
import { IntegerInput } from "../utils/IntegerInput";

type LightPeopleCategoryProps = {
  diet: Diet;
};

export function LightPeopleCategory({ diet }: LightPeopleCategoryProps) {
  const dispatch = useDispatch();
  const quantity = useSelector(peopleDietSelector(diet));
  const { t } = useTranslation();

  const setQuantity = (name: Diet) => (value: number) => {
    dispatch(setNumber({ type: name, quantity: value }));
  };

  return (
    <div
      className="flex-col flex items-center gap-1"
      data-testid={`people-light-category-${diet}`}
    >
      <span className="text-lg font-bold">
        {t(dietTranslationMap.get(diet) ?? "")}
      </span>
      <div className="flex items-center gap-2">
        <DietIcon type={diet} color="Color" className="size-7" />
        <IntegerInput
          className="text-2xl"
          value={quantity}
          setValue={setQuantity(diet)}
          testId={`people-category-${diet}`}
          title={{ value: `${diet}-person`, isKey: true, isFeminin: true }}
        />
      </div>
    </div>
  );
}
