import { Diet } from "../../types";
import { DietIcon } from "../icons/DietIcon";

type DietDisplayProps = {
  diet: Diet;
};

export function DietDisplay({ diet }: DietDisplayProps) {
  return (
    <div className="flex justify-between px-2">
      <DietIcon type="normal" color="Color" className="size-7" />
      {["pescoVegetarian", "vegetarian", "vegan"].includes(diet) ? (
        <DietIcon type="pescoVegetarian" color="Color" className="size-7" />
      ) : (
        <div className="size-7" />
      )}
      {["vegetarian", "vegan"].includes(diet) ? (
        <DietIcon type="vegetarian" color="Color" className="size-7" />
      ) : (
        <div className="size-7" />
      )}
      {"vegan" === diet ? (
        <DietIcon type="vegan" color="Color" className="size-7" />
      ) : (
        <div className="size-7" />
      )}
    </div>
  );
}
