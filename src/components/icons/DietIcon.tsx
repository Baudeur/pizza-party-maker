import { Diet } from "../../types";
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

const map = new Map<Diet, string>();
map.set("normal", "diet-icon-omnivorous");
map.set("pescoVegetarian", "diet-icon-pesco-vegetarian");
map.set("vegetarian", "diet-icon-vegetarian");
map.set("vegan", "diet-icon-vegan");

export function DietIcon({
  type,
  color,
  className,
  testId,
}: Readonly<DietIconProps>) {
  const { t } = useTranslation();

  const iconName = iconUrlMap.get(type);
  return (
    <div className={`relative ${className}`}>
      <img
        src={iconName}
        className={`size-full ${color === "BW" && "filter grayscale"}`}
        alt={t("alt-diet-icon", {
          color:
            color === "BW" ? t("alt-diet-color-bw") : t("alt-diet-color-color"),
          diet: t(map.get(type) ?? ""),
        })}
        data-testid={testId && `${testId}-${type}-diet-icon`}
        title={t(map.get(type) ?? "")}
      />
    </div>
  );
}
