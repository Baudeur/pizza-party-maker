import { useTranslation } from "react-i18next";
import { DietIcon } from "../icons/DietIcon";
import { Diet } from "../../types";
import { EitherDesktopOrMobile } from "./ReactiveComponents";

export type FlagState = "perfect" | "good" | "okay" | "bad" | "cantEat" | "N/A";

type FlagStateProps = {
  flagState: FlagState;
  diet: Diet;
  testId?: string;
  mobileExtended?: boolean;
};

export function PizzaFlag({
  flagState,
  diet,
  testId,
  mobileExtended = false,
}: Readonly<FlagStateProps>) {
  const { t } = useTranslation();
  let color = "bg-gray-300";
  let label = "N/A";
  let emoji = "❌";
  switch (flagState) {
    case "perfect":
      color = "bg-sky-400";
      label = t("pizza-flag-perfect");
      emoji = "👌";
      break;
    case "good":
      color = "bg-green-400";
      label = t("pizza-flag-good");
      emoji = "😊";
      break;
    case "okay":
      color = "bg-yellow-400";
      label = t("pizza-flag-okay");
      emoji = "😕";
      break;
    case "bad":
      color = "bg-red-400";
      label = t("pizza-flag-bad");
      emoji = "😖";
      break;
    case "cantEat":
      color = "bg-purple-400";
      label = t("pizza-flag-cant-eat");
      emoji = "💀";
      break;
  }
  return (
    <EitherDesktopOrMobile>
      <div>
        <div className="text-3xl font-bold mb-2 flex justify-center">
          <DietIcon
            type={diet}
            color="Color"
            className="size-8"
            testId={"flag-container"}
          />
        </div>
        <div
          className={`${color} h-full w-full rounded-lg flex justify-center flex-col min-w-24 min-h-14 cursor-default`}
          data-testid={testId}
        >
          <span className="font-bold text-lg">{label}</span>
          <span className="font-bold text-lg">{emoji}</span>
        </div>
      </div>
      <div
        className={`${color} h-8 w-full rounded-lg py-1 px-2 flex justify-between`}
        data-testid={testId}
      >
        <div className="font-bold flex justify-between items-center w-full">
          <DietIcon
            type={diet}
            color="Color"
            className="size-6"
            testId={"flag-container"}
          />
          <div>
            {mobileExtended && (
              <span className="font-bold text-lg mr-2">{label}</span>
            )}
            <span className="font-bold text-lg">{emoji}</span>
          </div>
        </div>
      </div>
    </EitherDesktopOrMobile>
  );
}

type LightPizzaFlagProps = {
  quantity: number;
  diet: Diet;
};

export function LightPizzaFlag({ quantity, diet }: LightPizzaFlagProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`bg-amber-300 h-full w-full rounded-lg flex items-center min-w-32 min-h-4 cursor-default`}
    >
      <div
        className={`flex items-center bg-amber-300 rounded-lg shadow-[10px_0px_15px_-3px_rgb(0,0,0,0.1),4px_0px_6px_-4px_rgb(0,0,0,0.1)]`}
      >
        <DietIcon type={diet} color="Color" className="size-5 m-2" />
      </div>
      <div className="flex mr-2 justify-center items-center h-full w-full">
        <span className="font-bold text-lg">
          {t("light-quantity-slices", {
            count: quantity,
          })}
        </span>
      </div>
    </div>
  );
}
