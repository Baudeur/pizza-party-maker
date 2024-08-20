import { useDispatch, useSelector } from "react-redux";
import { Diet } from "../../types";
import { IntegerInput } from "../utils/IntegerInput";
import { peopleDietSelector } from "../../modules/people/selector";
import { setNumber } from "../../modules/people/slice";
import { DietIcon } from "../icons/DietIcon";

type PeopleCategoryProps = {
  diet: Diet;
};

export function PeopleCategory({ diet }: PeopleCategoryProps) {
  const dispatch = useDispatch();
  const quantity = useSelector(peopleDietSelector(diet));

  const setQuantity = (name: Diet) => (value: number) => {
    dispatch(setNumber({ type: name, quantity: value }));
  };

  return (
    <div className="text-2xl flex mb-3 last:mb-0">
      <div className="mr-3 ">
        <DietIcon type={diet} color="Color" className="h-7 w-7" />
      </div>
      <IntegerInput value={quantity} setValue={setQuantity(diet)} />
    </div>
  );
}
