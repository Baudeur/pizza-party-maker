import { useDispatch, useSelector } from "react-redux";
import { paramsSelector } from "../../modules/params/selector";
import { setSlices } from "../../modules/params/slice";
import { IntegerInput } from "../utils/IntegerInput";

export function Params() {
  const { slices } = useSelector(paramsSelector);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col text-lg w-64 items-start">
      <span>Slices per pizzas : {slices}</span>
      <IntegerInput
        value={slices}
        setValue={(value) => dispatch(setSlices(value))}
        max={16}
        min={1}
      />
      {/* <input
        className="accent-green-500"
        type="range"
        min="4"
        max="16"
        value={slices}
        onChange={(e) => dispatch(setSlices(Number(e.target.value)))}
      /> */}
    </div>
  );
}
