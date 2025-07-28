import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { overlayPropsSelector } from "../../modules/overlays/selector";
import { Button } from "../utils/Button";
import { CloseContext } from "../utils/OverlayInside";
import { useContext } from "react";
import { useAppDispatch } from "../../hooks";
import { setNeverShowAgain } from "../../modules/params/slice";
import { neverShowAgainSelector } from "../../modules/params/selector";

export function LightWarningConfirmOverlay() {
  const { t } = useTranslation();
  const animateAndClose = useContext(CloseContext);
  const props = useSelector(overlayPropsSelector);
  const dispatch = useAppDispatch();
  const neverShowAgain = useSelector(neverShowAgainSelector);
  if (props?.confirmAction === undefined) return;

  const handleClose = () => {
    animateAndClose();
  };

  const handleConfirm = () => {
    animateAndClose();
    props.confirmAction();
  };

  return (
    <div className="mb-2 max-w-[400px]">
      <p className="text-start pt-2">{props.message}</p>
      <div className="flex justify-end items-center gap-2 my-4">
        <input
          type={"checkbox"}
          checked={neverShowAgain[props.neverShowAgainKey]}
          onChange={() =>
            dispatch(
              setNeverShowAgain({
                [props.neverShowAgainKey]:
                  !neverShowAgain[props.neverShowAgainKey],
              })
            )
          }
          className="accent-green-500 size-5"
          data-testid={"light-warning-checkbox"}
        />
        <span>{t("light-warning-checkbox")}</span>
      </div>

      <div className="flex justify-end gap-2 w-full">
        <Button
          color="orange"
          onClick={handleClose}
          title={t("cancel")}
          className="rounded-lg px-2 text-lg"
          testId={"light-warning-cancel-button"}
        >
          {t("cancel")}
        </Button>
        <Button
          color="green"
          onClick={handleConfirm}
          title={props.confirmTitle}
          className="rounded-lg px-2 text-lg"
          testId={"light-warning-confirm-button"}
        >
          {props.confirmLabel}
        </Button>
      </div>
    </div>
  );
}
