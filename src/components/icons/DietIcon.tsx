import { useEffect, useState } from "react";
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

type TooltipState = "out" | "in" | "display";

const map = new Map<Diet, string>();
map.set("normal", "omnivorous");
map.set("pescoVegetarian", "pesco‑vegetarian");
map.set("vegetarian", "vegetarian");
map.set("vegan", "vegan");

export function DietIcon({ type, color, className }: DietIconProps) {
  const [tooltipState, setToolTipState] = useState<TooltipState>("out");
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (tooltipState === "out") {
      clearTimeout(timerId);
      setTimerId(0);
    }
    if (tooltipState === "in" && timerId == 0) {
      setTimerId(
        setTimeout(() => {
          setToolTipState("display");
        }, 1000)
      );
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [tooltipState, timerId]);

  const iconName = "src/assets/" + dietToIconMap.get(type) + ".png";
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setToolTipState("in")}
      onMouseLeave={() => setToolTipState("out")}
    >
      <img
        src={iconName}
        className={`size-full ${color === "BW" && "filter grayscale"}`}
      />
      {tooltipState === "display" && (
        <div className="top-[-100%] translate-x-[-50%] left-1/2 text-base absolute z-20 bg-white border-[1px] border-gray-600 px-2 rounded-md">
          {map.get(type)}
        </div>
      )}
    </div>
  );
}
