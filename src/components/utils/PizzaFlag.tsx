import { useTranslation } from "react-i18next";
import { DietIcon } from "../icons/DietIcon";
import { Diet } from "../../types";

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
        <span
          className="font-bold text-lg"
          data-testid={`light-pizza-flag-${diet}`}
        >
          {t("light-quantity-slices", {
            count: quantity,
          })}
        </span>
      </div>
    </div>
  );
}
