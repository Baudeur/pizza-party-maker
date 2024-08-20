import { PeopleAte } from "../../services/calculatorService";

type CaseScenarioProps = {
  label: string;
  peopleAte: PeopleAte;
};

export function CaseScenario({ label, peopleAte }: CaseScenarioProps) {
  const map = [
    { emoji: "🍗", ate: peopleAte.normal },
    { emoji: "🐟", ate: peopleAte.pescoVegetarian },
    { emoji: "🧀", ate: peopleAte.vegetarian },
    { emoji: "🥕", ate: peopleAte.vegan },
  ];
  return (
    <div className="flex justify-start w-full mt-1 mb-1">
      <span className="w-48 text-right">{label}</span>
      {map.map((obj) => (
        <div
          className="bg-amber-200 rounded-lg pr-2 pl-2 w-20 flex items-center ml-2"
          key={obj.emoji}
        >
          <span className="text-sm">{obj.emoji}</span>
          <span className="text-lg w-full">{obj.ate}</span>
        </div>
      ))}
    </div>
  );
}
