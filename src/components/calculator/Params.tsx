import { useDispatch, useSelector } from "react-redux";
import { paramsSelector } from "../../modules/params/selector";
import { setSlices } from "../../modules/params/slice";

export function Params() {
  const { slices } = useSelector(paramsSelector);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col text-lg w-64 items-start">
      <span>Slices per pizzas : {slices}</span>
      <input
        className="accent-green-500"
        type="range"
        min="4"
        max="16"
        value={slices}
        onChange={(e) => dispatch(setSlices(Number(e.target.value)))}
      />
    </div>
  );
}
