import { useDispatch, useSelector } from "react-redux";
import { Diet, dietTranslationMap } from "../../types";
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
        title={{ value: `${diet}-person`, isKey: true, isFeminin: true }}
      />
    </div>
  );
}

export function LightPeopleCategory({ diet }: PeopleCategoryProps) {
  const dispatch = useDispatch();
  const quantity = useSelector(peopleDietSelector(diet));
  const { t } = useTranslation();

  const setQuantity = (name: Diet) => (value: number) => {
    dispatch(setNumber({ type: name, quantity: value }));
  };

  return (
    <div
      className="flex-col flex items-center gap-1"
      data-testid={`light-people-category-${diet}`}
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
          testId={`light-people-category-${diet}`}
          title={{ value: `${diet}-person`, isKey: true, isFeminin: true }}
        />
      </div>
    </div>
  );
}
