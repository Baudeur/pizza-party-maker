import { useDispatch, useSelector } from "react-redux";
import {
  sliceSelector,
  thresholdsSelector,
} from "../../modules/params/selector";
import {
  setBadThresholds,
  setOkayThresholds,
  setSlices,
} from "../../modules/params/slice";
import { IntegerInput } from "../utils/IntegerInput";
import { FairnessSelector } from "../utils/FairnessSelector";
import { RotateCcw } from "lucide-react";

export function Params() {
  const slices = useSelector(sliceSelector);
  const { okay, bad } = useSelector(thresholdsSelector);
  const dispatch = useDispatch();

  const setThresholds = (value1: number, value2: number) => {
    dispatch(setOkayThresholds(value1));
    dispatch(setBadThresholds(value2));
  };

  return (
    <div>
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-4 text-center w-full">
        Parameters
      </p>
      <div className="px-4">
        <div className="flex text-lg w-64 items-center mb-2">
          <span className="mr-2">Slices per pizzas</span>
          <IntegerInput
            value={slices}
            setValue={(value) => dispatch(setSlices(value))}
            max={16}
            min={1}
            testId="slice-parameter"
          />
        </div>
        <div className="flex text-lg mb-2">
          <div className="flex items-center h-fit">
            <span className="mr-2 w-16 text-start">Fairness</span>
            <button
              onClick={() => setThresholds(1.25, 1.5)}
              className="size-5 rounded-lg flex items-center justify-center hover:bg-black hover:bg-opacity-25"
              title="Restore default"
              data-testid="params-fairness-reset-button"
            >
              <RotateCcw size={15} strokeWidth={2} />
            </button>
          </div>
          <FairnessSelector
            value1={okay}
            value2={bad}
            onChange={(value1, value2) => setThresholds(value1, value2)}
            min={1.05}
            max={2}
            step={0.05}
            data-testid="params-fairness"
          />
        </div>
      </div>
    </div>
  );
}
