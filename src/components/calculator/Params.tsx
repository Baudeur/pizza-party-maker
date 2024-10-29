import { useDispatch, useSelector } from "react-redux";
import {
  badThresoldsSelector,
  okayThresoldsSelector,
  sliceSelector,
} from "../../modules/params/selector";
import {
  setBadThresholds,
  setOkayThresholds,
  setSlices,
} from "../../modules/params/slice";
import { IntegerInput } from "../utils/IntegerInput";
import { FairnessSelector } from "../utils/FairnessSelector";

export function Params() {
  const slices = useSelector(sliceSelector);
  const okayThreshold = useSelector(okayThresoldsSelector);
  const badThreshold = useSelector(badThresoldsSelector);
  const dispatch = useDispatch();

  const setThresholds = (value1: number, value2: number) => {
    dispatch(setOkayThresholds(value1));
    dispatch(setBadThresholds(value2));
  };

  return (
    <div>
      <div className="flex text-lg w-64 items-center mb-2">
        <span className="mr-2">Slices per pizzas</span>
        <IntegerInput
          value={slices}
          setValue={(value) => dispatch(setSlices(value))}
          max={16}
          min={1}
          testId="parameters"
        />
      </div>
      <div className="flex text-lg items-center mb-2">
        <span className="mr-2 w-20 text-start">Fairness</span>
        <FairnessSelector
          value1={okayThreshold}
          value2={badThreshold}
          onChange={(value1, value2) => setThresholds(value1, value2)}
          min={1.05}
          max={2}
          step={0.05}
          data-testid="params-fairness-okay-slider"
        />
      </div>
    </div>
  );
}
