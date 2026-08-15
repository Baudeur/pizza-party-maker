export type Diet = "normal" | "pescoVegetarian" | "vegetarian" | "vegan";

export const diets: Diet[] = [
  "normal",
  "pescoVegetarian",
  "vegetarian",
  "vegan",
];

export const dietTranslationMap = new Map<Diet, string>();
dietTranslationMap.set("normal", "omnivorous");
dietTranslationMap.set("pescoVegetarian", "pesco-vegetarian");
dietTranslationMap.set("vegetarian", "vegetarian");
dietTranslationMap.set("vegan", "vegan");

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
