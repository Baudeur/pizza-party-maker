import { useSelector } from "react-redux";
import { PeopleAte, stateOfDiet } from "../../services/calculatorService";
import { diets } from "../../types";
import { PizzaFlag } from "../utils/PizzaFlag";
import { peopleSelector } from "../../modules/people/selector";
import { thresholdsSelector } from "../../modules/params/selector";
import { EitherDesktopOrMobile } from "../utils/ReactiveComponents";
import { QuantityFlag } from "./QuantityFlag";
import { PriceFlag } from "./PriceFlag";

type InfoDisplayProps = {
  peopleAteAvg: PeopleAte;
  mobileExtended?: boolean;
};

export function InfoDisplay({
  peopleAteAvg,
  mobileExtended = false,
}: Readonly<InfoDisplayProps>) {
  const people = useSelector(peopleSelector);
  const { okay, bad } = useSelector(thresholdsSelector);

  return (
    <EitherDesktopOrMobile>
      <div className="flex gap-2 w-full">
        {diets.map((diet) => (
          <div
            className="h-full w-full"
            key={diet}
            data-testid={`${diet}-flag-container`}
          >
            <PizzaFlag
              flagState={stateOfDiet(diet, peopleAteAvg, people, okay, bad)}
              diet={diet}
              testId={`${diet}-flag`}
            />
          </div>
        ))}
        <QuantityFlag />
        <PriceFlag />
      </div>
      <div className="flex flex-col gap-2">
        <div className={`flex w-full gap-2 ${mobileExtended && "flex-col"}`}>
          {mobileExtended ? (
            <>
              <div className="flex gap-2 w-full">
                <PizzaFlag
                  key={"normal"}
                  flagState={stateOfDiet(
                    "normal",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"normal"}
                  testId={`${"normal"}-flag`}
                  mobileExtended={mobileExtended}
                />
                <PizzaFlag
                  key={"pescoVegetarian"}
                  flagState={stateOfDiet(
                    "pescoVegetarian",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"pescoVegetarian"}
                  testId={`${"pescoVegetarian"}-flag`}
                  mobileExtended={mobileExtended}
                />
              </div>
              <div className="flex gap-2 w-full">
                <PizzaFlag
                  key={"vegetarian"}
                  flagState={stateOfDiet(
                    "vegetarian",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"vegetarian"}
                  testId={`${"vegetarian"}-flag`}
                  mobileExtended={mobileExtended}
                />
                <PizzaFlag
                  key={"vegan"}
                  flagState={stateOfDiet(
                    "vegan",
                    peopleAteAvg,
                    people,
                    okay,
                    bad
                  )}
                  diet={"vegan"}
                  testId={`${"vegan"}-flag`}
                  mobileExtended={mobileExtended}
                />
              </div>
            </>
          ) : (
            <>
              {diets.map((diet) => (
                <PizzaFlag
                  key={diet}
                  flagState={stateOfDiet(diet, peopleAteAvg, people, okay, bad)}
                  diet={diet}
                  testId={`${diet}-flag`}
                  mobileExtended={mobileExtended}
                />
              ))}
            </>
          )}
        </div>
        <div className="flex gap-2 w-full">
          <QuantityFlag mobileExtended={mobileExtended} />
          <PriceFlag mobileExtended={mobileExtended} />
        </div>
      </div>
    </EitherDesktopOrMobile>
  );
}
