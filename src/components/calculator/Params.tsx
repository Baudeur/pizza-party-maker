import { useDispatch, useSelector } from "react-redux";
import { paramsSelector } from "../../modules/params/selector";
import { setSlices } from "../../modules/params/slice";
import { IntegerInput } from "../utils/IntegerInput";

export function Params() {
  const { slices } = useSelector(paramsSelector);
  const dispatch = useDispatch();

  return (
    <div className="flex text-lg w-64 items-start">
      <span className="mr-2">Slices per pizzas</span>
      <IntegerInput
        value={slices}
        setValue={(value) => dispatch(setSlices(value))}
        max={16}
        min={1}
        testId="parameters"
      />
    </div>
  );
}
