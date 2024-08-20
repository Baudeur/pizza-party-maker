import { useDispatch, useSelector } from "react-redux";
import { Diet } from "../../types";
import { IntegerInput } from "../utils/IntegerInput";
import { peopleDietSelector } from "../../modules/people/selector";
import { setNumber } from "../../modules/people/slice";

type PeopleCategoryProps = {
  name: Diet;
  displayEmoji: string;
};

export function PeopleCategory({ name, displayEmoji }: PeopleCategoryProps) {
  const dispatch = useDispatch();
  const quantity = useSelector(peopleDietSelector(name));

  const setQuantity = (name: Diet) => (value: number) => {
    dispatch(setNumber({ type: name, quantity: value }));
  };

  return (
    <div className="text-2xl flex mb-3 last:mb-0">
      <span className="mr-3 ">{displayEmoji}</span>
      <IntegerInput value={quantity} setValue={setQuantity(name)} />
    </div>
  );
}
