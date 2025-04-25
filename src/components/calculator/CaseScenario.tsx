import { useMediaQuery } from "react-responsive";
import { PeopleAte } from "../../services/calculatorService";
import { diets } from "../../types";
import { DietIcon } from "../icons/DietIcon";
import { desktopSize } from "../../services/constants";

type CaseScenarioProps = {
  label: string;
  peopleAte: PeopleAte;
  testId?: string;
};

export function CaseScenario({
  label,
  peopleAte,
  testId,
}: Readonly<CaseScenarioProps>) {
  const isDesktop = useMediaQuery({ minWidth: desktopSize });

  return (
    <div
      className={`flex w-full mt-1 mb-1 ${!isDesktop && "flex-col"}`}
      data-testid={testId}
    >
      <span
        className={
          isDesktop ? "min-w-48 text-right mr-2" : "w-full text-center"
        }
        data-testid={`${testId}-label`}
      >
        {label}
      </span>
      <div className="flex w-full gap-2">
        {diets.map((diet) => (
          <div
            className="bg-amber-200 rounded-lg px-2 w-full max-w-20 flex items-center"
            key={diet}
            data-testid={`${testId}-${diet}-value`}
          >
            <DietIcon type={diet} color="Color" className="h-4 w-4 min-w-4" />
            <span className={`${isDesktop ? "text-lg" : "text-base"} w-full`}>
              {peopleAte[diet]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
