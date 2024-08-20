import { Diet } from "../../types";

type IconColor = "Color" | "BW";

type DietIconProps = {
  type: Diet;
  color: IconColor;
  className?: string;
};

const dietToIconMap = new Map<Diet, string>();
dietToIconMap.set("normal", "Meat");
dietToIconMap.set("pescoVegetarian", "Fish");
dietToIconMap.set("vegetarian", "Cheese");
dietToIconMap.set("vegan", "Carrot");

export function DietIcon({ type, color, className }: DietIconProps) {
  const iconName = "src/assets/" + dietToIconMap.get(type) + ".png";
  return (
    <div className={`${className}`}>
      <img
        src={iconName}
        className={`size-full ${color === "BW" && "filter grayscale"}`}
      />
    </div>
  );
}
