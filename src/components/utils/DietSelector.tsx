import { forwardRef } from "react";
import { calcDiet } from "../../services/utils";
import { Diet } from "../../types";
import { DietIcon } from "../icons/DietIcon";

type DietSelectorProps = {
  value: Diet;
  onChange: (value: Diet) => void;
  tabIndex?: number;
};

export const DietSelector = forwardRef<HTMLDivElement, DietSelectorProps>(
  function DietSelector({ value, onChange, tabIndex }, ref) {
    return (
      <div
        ref={ref}
        tabIndex={tabIndex}
        className="flex justify-between items-center px-2"
        onKeyDown={(event) => {
          switch (event.key) {
            case "ArrowRight":
              onChange(calcDiet(value, "next"));
              break;
            case "ArrowLeft":
              onChange(calcDiet(value, "prev"));
              break;
          }
        }}
      >
        <div className="cursor-pointer" onClick={() => onChange("normal")}>
          <DietIcon type="normal" color="Color" className="size-7" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => onChange("pescoVegetarian")}
        >
          <DietIcon
            type="pescoVegetarian"
            color={
              ["pescoVegetarian", "vegetarian", "vegan"].includes(value)
                ? "Color"
                : "BW"
            }
            className="size-7"
          />
        </div>
        <div className="cursor-pointer" onClick={() => onChange("vegetarian")}>
          <DietIcon
            type="vegetarian"
            color={["vegetarian", "vegan"].includes(value) ? "Color" : "BW"}
            className="size-7"
          />
        </div>
        <div className="cursor-pointer" onClick={() => onChange("vegan")}>
          <DietIcon
            type="vegan"
            color={value === "vegan" ? "Color" : "BW"}
            className="size-7"
          />
        </div>
      </div>
    );
  }
);
