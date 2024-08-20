import { Container } from "../utils/Container";
import { PeopleCategory } from "./PeopleCategory";

export function People() {
  return (
    <Container className="mr-4 mb-4">
      <div className="text-xl font-bold mb-2">People</div>
      <PeopleCategory diet="normal" />
      <PeopleCategory diet="pescoVegetarian" />
      <PeopleCategory diet="vegetarian" />
      <PeopleCategory diet="vegan" />
    </Container>
  );
}
