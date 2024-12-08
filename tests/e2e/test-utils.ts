import { expect, Page } from "@playwright/test";

export async function checkPizza(
  page: Page,
  id: number,
  quantity: number,
  name: string,
  diet: string,
  price: string
) {
  const quantityDisplay = page.getByTestId(
    `${id}-pizza-display-quantity-display`
  );
  const nameDisplay = page.getByTestId(`${id}-pizza-display-name`);
  const dietDisplay = page.getByTestId(
    `${id}-pizza-display-diet-${diet}-diet-icon`
  );
  const dietNot = page.getByTestId(
    `${id}-pizza-display-diet-${nextDiet(diet)}-diet-icon`
  );
  const priceDisplay = page.getByTestId(`${id}-pizza-display-price`);
  await expect(quantityDisplay).toHaveText(quantity.toString());
  await expect(nameDisplay).toHaveText(name);
  await expect(dietDisplay).toBeVisible();
  await expect(dietNot).not.toBeVisible();
  await expect(priceDisplay).toHaveText(price + " €");
}

function nextDiet(diet) {
  if (diet === "normal") return "pescoVegetarian";
  if (diet === "pescoVegetarian") return "vegetarian";
  if (diet === "vegetarian") return "vegan";
  return "null";
}

export async function createPizza(
  page: Page,
  quantity: number = 1,
  name: string = "",
  diet: string = "normal",
  price: string = ""
) {
  const quantityInput = page.getByTestId("pizza-form-quantity-input");
  const nameInput = page.getByTestId("pizza-form-name");
  const dietInputButton = page.getByTestId(`pizza-form-diet-${diet}-button`);
  const priceInput = page.getByTestId("pizza-form-price");
  const submit = page.getByTestId("pizza-form-submit");
  await quantityInput.fill(quantity.toString());
  await nameInput.fill(name);
  await dietInputButton.click();
  await priceInput.fill(price);
  await submit.click();
}

export async function setPeople(
  page: Page,
  normal: number,
  pescoVegetarian: number,
  vegetarian: number,
  vegan: number
) {
  const inputNormal = page.getByTestId("people-category-normal-input");
  const inputPescoVegetarian = page.getByTestId(
    "people-category-pescoVegetarian-input"
  );
  const inputVegetarian = page.getByTestId("people-category-vegetarian-input");
  const inputVegan = page.getByTestId("people-category-vegan-input");
  await inputNormal.fill(normal.toString());
  await inputPescoVegetarian.fill(pescoVegetarian.toString());
  await inputVegetarian.fill(vegetarian.toString());
  await inputVegan.fill(vegan.toString());
}

export const diets = ["normal", "pescoVegetarian", "vegetarian", "vegan"];
