import { Diet } from "../../types";
import { DietIcon } from "../icons/DietIcon";

type DietDisplayProps = {
  diet: Diet;
  testId?: string;
};

export function DietDisplay({ diet, testId }: Readonly<DietDisplayProps>) {
  return (
    <div className="flex gap-1 px-2" data-testid={testId}>
      <DietIcon
        type="normal"
        color="Color"
        className="size-7"
        testId={testId}
      />
      {["pescoVegetarian", "vegetarian", "vegan"].includes(diet) ? (
        <DietIcon
          type="pescoVegetarian"
          color="Color"
          className="size-7"
          testId={testId}
        />
      ) : (
        <div className="size-7" />
      )}
      {["vegetarian", "vegan"].includes(diet) ? (
        <DietIcon
          type="vegetarian"
          color="Color"
          className="size-7"
          testId={testId}
        />
      ) : (
        <div className="size-7" />
      )}
      {"vegan" === diet ? (
        <DietIcon
          type="vegan"
          color="Color"
          className="size-7"
          testId={testId}
        />
      ) : (
        <div className="size-7" />
      )}
    </div>
  );
}
