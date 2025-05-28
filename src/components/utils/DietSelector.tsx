import { forwardRef } from "react";
import { calcDiet } from "../../services/utils";
import { Diet } from "../../types";
import { DietIcon } from "../icons/DietIcon";

type DietSelectorProps = {
  value: Diet;
  onChange: (value: Diet) => void;
  tabIndex?: number;
  testId?: string;
};

export const DietSelector = forwardRef<HTMLDivElement, DietSelectorProps>(
  function DietSelector({ value, onChange, tabIndex, testId }, ref) {
    return (
      <div
        ref={ref}
        tabIndex={tabIndex}
        className="flex gap-1 items-center px-2"
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
        data-testid={testId}
      >
        <button
          className="cursor-pointer"
          onClick={() => onChange("normal")}
          tabIndex={-1}
          data-testid={testId && `${testId}-normal-button`}
        >
          <DietIcon type="normal" color="Color" className="size-7" />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => onChange("pescoVegetarian")}
          tabIndex={-1}
          data-testid={testId && `${testId}-pescoVegetarian-button`}
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
        </button>
        <button
          className="cursor-pointer"
          onClick={() => onChange("vegetarian")}
          tabIndex={-1}
          data-testid={testId && `${testId}-vegetarian-button`}
        >
          <DietIcon
            type="vegetarian"
            color={["vegetarian", "vegan"].includes(value) ? "Color" : "BW"}
            className="size-7"
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => onChange("vegan")}
          tabIndex={-1}
          data-testid={testId && `${testId}-vegan-button`}
        >
          <DietIcon
            type="vegan"
            color={value === "vegan" ? "Color" : "BW"}
            className="size-7"
          />
        </button>
      </div>
    );
  }
);
