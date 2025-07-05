import { Diet, dietTranslationMap } from "../../types";
import veganIconUrl from "../../assets/Carrot.png";
import vegetarianIconUrl from "../../assets/Cheese.png";
import pescoVegetarianIconUrl from "../../assets/Fish.png";
import normalIconUrl from "../../assets/Meat.png";
import { useTranslation } from "react-i18next";

type IconColor = "Color" | "BW";

type DietIconProps = {
  type: Diet;
  color: IconColor;
  className?: string;
  testId?: string;
};

const iconUrlMap = new Map<Diet, string>();
iconUrlMap.set("normal", normalIconUrl);
iconUrlMap.set("pescoVegetarian", pescoVegetarianIconUrl);
iconUrlMap.set("vegetarian", vegetarianIconUrl);
iconUrlMap.set("vegan", veganIconUrl);

export function DietIcon({
  type,
  color,
  className,
  testId,
}: Readonly<DietIconProps>) {
  const { t } = useTranslation();

  const iconName = iconUrlMap.get(type);
  return (
    <span className={`block relative ${className}`}>
      <img
        src={iconName}
        className={`size-full ${color === "BW" && "filter grayscale"}`}
        alt={t("alt-diet-icon", {
          color:
            color === "BW" ? t("alt-diet-color-bw") : t("alt-diet-color-color"),
          diet: t(dietTranslationMap.get(type) ?? ""),
        })}
        data-testid={testId && `${testId}-${type}-diet-icon`}
        title={t(dietTranslationMap.get(type) ?? "")}
      />
    </span>
  );
}
