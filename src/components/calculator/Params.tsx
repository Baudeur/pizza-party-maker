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
import { useTranslation } from "react-i18next";

export function Params() {
  const { t } = useTranslation();
  const slices = useSelector(sliceSelector);
  const { okay, bad } = useSelector(thresholdsSelector);
  const dispatch = useDispatch();

  const setThresholds = (value1: number, value2: number) => {
    dispatch(setOkayThresholds(value1));
    dispatch(setBadThresholds(value2));
  };

  return (
    <div>
      <div className="flex text-lg w-64 items-center mb-2">
        <span className="mr-2">{t("parameters-slices")}</span>
        <IntegerInput
          value={slices}
          setValue={(value) => dispatch(setSlices(value))}
          max={16}
          min={1}
          testId="slice-parameter"
        />
      </div>
      <div className="flex text-lg mb-2">
        <span className="mr-2 w-16 text-start">{t("parameters-fairness")}</span>
        <FairnessSelector
          value1={okay}
          value2={bad}
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
