import { Container } from "../utils/Container";
import { PeopleCategory } from "./PeopleCategory";

export function People() {
  return (
    <Container className="mr-4 mb-4">
      <PeopleCategory name="normal" displayEmoji="🍗" />
      <PeopleCategory name="pescoVegetarian" displayEmoji="🐟" />
      <PeopleCategory name="vegetarian" displayEmoji="🧀" />
      <PeopleCategory name="vegan" displayEmoji="🥕" />
    </Container>
  );
}
