import { useDispatch, useSelector } from "react-redux";
import { Diet } from "../../types";
import { IntegerInput } from "../utils/IntegerInput";
import { peopleDietSelector } from "../../modules/people/selector";
import { setNumber } from "../../modules/people/slice";
import { DietIcon } from "../icons/DietIcon";
import { useTranslation } from "react-i18next";

type PeopleCategoryProps = {
  diet: Diet;
};

export function PeopleCategory({ diet }: Readonly<PeopleCategoryProps>) {
  const dispatch = useDispatch();
  const quantity = useSelector(peopleDietSelector(diet));
  const { t } = useTranslation();

  const setQuantity = (name: Diet) => (value: number) => {
    dispatch(setNumber({ type: name, quantity: value }));
  };

  return (
    <div className="text-2xl flex mb-3" data-testid={`people-category-${diet}`}>
      <div className="mr-3 ">
        <DietIcon type={diet} color="Color" className="size-7" />
      </div>
      <IntegerInput
        value={quantity}
        setValue={setQuantity(diet)}
        testId={`people-category-${diet}`}
        title={t(`${diet}-person`).toLowerCase()}
      />
    </div>
  );
}
