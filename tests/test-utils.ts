import { expect, Locator, Page } from "@playwright/test";

export const defaultURLLight = "localhost:5173/";

export async function checkPizza(
  page: Page,
  id: number,
  quantity: number,
  name: string,
  diet: string,
  price: string,
) {
  const quantityDisplay = page.getByTestId(
    `${id}-pizza-display-quantity-display`,
  );
  const nameDisplay = page.getByTestId(`${id}-pizza-display-name`);
  const dietDisplay = page.getByTestId(
    `${id}-pizza-display-diet-${diet}-diet-icon`,
  );
  const dietNot = page.getByTestId(
    `${id}-pizza-display-diet-${nextDiet(diet)}-diet-icon`,
  );
  const priceDisplay = page.getByTestId(`${id}-pizza-display-price`);
  await expect(quantityDisplay).toHaveText(quantity.toString());
  await expect(nameDisplay).toHaveText(name === "" ? "Unnamed" : name);
  await expect(dietDisplay).toBeVisible();
  await expect(dietNot).not.toBeVisible();
  await expect(priceDisplay).toHaveText(price + " €");
}

function nextDiet(diet: string) {
  if (diet === "normal") return "pescoVegetarian";
  if (diet === "pescoVegetarian") return "vegetarian";
  if (diet === "vegetarian") return "vegan";
  return "null";
}

export async function setPeople(
  page: Page,
  normal: number,
  pescoVegetarian: number,
  vegetarian: number,
  vegan: number,
) {
  const inputNormal = page.getByTestId("people-category-normal-input");
  const inputPescoVegetarian = page.getByTestId(
    "people-category-pescoVegetarian-input",
  );
  const inputVegetarian = page.getByTestId("people-category-vegetarian-input");
  const inputVegan = page.getByTestId("people-category-vegan-input");
  await inputNormal.fill(normal.toString());
  await inputPescoVegetarian.fill(pescoVegetarian.toString());
  await inputVegetarian.fill(vegetarian.toString());
  await inputVegan.fill(vegan.toString());
}

export async function setLightPeople(
  page: Page,
  normal: number,
  pescoVegetarian: number,
  vegetarian: number,
  vegan: number,
) {
  const inputNormal = page.getByTestId("light-people-category-normal-input");
  const inputPescoVegetarian = page.getByTestId(
    "light-people-category-pescoVegetarian-input",
  );
  const inputVegetarian = page.getByTestId(
    "light-people-category-vegetarian-input",
  );
  const inputVegan = page.getByTestId("light-people-category-vegan-input");
  await inputNormal.fill(normal.toString());
  await inputPescoVegetarian.fill(pescoVegetarian.toString());
  await inputVegetarian.fill(vegetarian.toString());
  await inputVegan.fill(vegan.toString());
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export const diets = ["normal", "pescoVegetarian", "vegetarian", "vegan"];

export async function setQuantityTo(slider: Locator, value: number) {
  const bounds = await slider.boundingBox();
  const percentage = (value - 1) / 15;
  await slider.click({
    position: {
      x: 1 + ((bounds?.width ?? 1) - 2) * percentage,
      y: (bounds?.height ?? 0) / 2,
    },
  });
}

export async function sliceToNumber(diet: Locator) {
  let content = await diet.textContent();
  if (content === null) return 0;
  content = content.replace(" slices", "");
  content = content.replace(" slice", "");
  return Number(content);
}
