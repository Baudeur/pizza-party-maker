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
import { RotateCcw } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Mobile } from "../utils/ReactiveComponents";

export function Params() {
  const { t } = useTranslation();
  const slices = useSelector(sliceSelector);
  const { okay, bad } = useSelector(thresholdsSelector);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: desktopSize });

  const setThresholds = (value1: number, value2: number) => {
    dispatch(setOkayThresholds(value1));
    dispatch(setBadThresholds(value2));
  };

  return (
    <div>
      <Mobile>
        <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-4 text-center w-full">
          {t("parameters-title")}
        </p>
      </Mobile>
      <div className="px-4">
        <div
          className={`flex text-lg items-center mb-4 ${
            !isDesktop && "flex-col items-center w-full"
          }`}
        >
          <span className={`mr-2 font-bold ${!isDesktop && "mb-2"}`}>
            {t("parameters-slices")}
          </span>
          <IntegerInput
            value={slices}
            setValue={(value) => dispatch(setSlices(value))}
            max={16}
            min={1}
            testId="slice-parameter"
            title={t("parameters-slices").toLowerCase()}
          />
        </div>
        <div
          className={`flex ${
            !isDesktop && "flex-col items-center"
          } text-lg mb-2`}
        >
          <div className={`flex items-center h-fit ${!isDesktop && "mb-2"}`}>
            <span className="mr-2 w-16 text-start font-bold">
              {t("parameters-fairness")}
            </span>
            <button
              onClick={() => setThresholds(1.25, 1.5)}
              className="size-5 rounded-lg flex items-center justify-center hover:bg-black hover:bg-opacity-25"
              title={t("parameters-restore-default")}
              data-testid="params-fairness-reset-button"
            >
              <RotateCcw size={15} strokeWidth={2} />
            </button>
          </div>
          <FairnessSelector
            value1={okay}
            value2={bad}
            onValue1Change={(value1) => setThresholds(value1, bad)}
            onValue2Change={(value2) => setThresholds(okay, value2)}
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
