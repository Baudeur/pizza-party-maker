import { useSelector } from "react-redux";
import { Container } from "../utils/Container";
import { PeopleCategory } from "./PeopleCategory";
import { peopleSelector } from "../../modules/people/selector";
import { diets } from "../../types";

export function People() {
  const people = useSelector(peopleSelector);
  return (
    <Container className="mr-4 mb-4" testId="people-panel">
      <div className="text-xl font-bold mb-2">People</div>
      <PeopleCategory diet="normal" />
      <PeopleCategory diet="pescoVegetarian" />
      <PeopleCategory diet="vegetarian" />
      <PeopleCategory diet="vegan" />
      <div className="text-xl font-bold" data-testid="people-total">
        Total: {diets.reduce((acc, curr) => acc + people[curr], 0)}
      </div>
    </Container>
  );
}
