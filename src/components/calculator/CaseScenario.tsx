import { PeopleAte } from "../../services/calculatorService";
import { diets } from "../../types";
import { DietIcon } from "../icons/DietIcon";

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
  return (
    <div className="flex justify-start w-full mt-1 mb-1" data-testid={testId}>
      <span className="w-48 text-right" data-testid={`${testId}-label`}>
        {label}
      </span>
      {diets.map((diet) => (
        <div
          className="bg-amber-200 rounded-lg px-2 w-20 flex items-center ml-2"
          key={diet}
          data-testid={`${testId}-${diet}-value`}
        >
          <DietIcon type={diet} color="Color" className="h-4 w-4 min-w-4" />
          <span className="text-lg w-full">{peopleAte[diet]}</span>
        </div>
      ))}
    </div>
  );
}
