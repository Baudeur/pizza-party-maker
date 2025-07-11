import { expect, Page } from "@playwright/test";

export const defaultURL = "localhost:5173/#/old";

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
  await expect(nameDisplay).toHaveText(name === "" ? "Unnamed" : name);
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
  id: number,
  quantity: number = 1,
  name: string = "",
  diet: string = "normal",
  price: string = ""
) {
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();
  const quantityInput = page.getByTestId(`${id}-pizza-edit-quantity-input`);
  const nameInput = page.getByTestId(`${id}-pizza-edit-name`);
  const dietInputButton = page.getByTestId(
    `${id}-pizza-edit-diet-${diet}-button`
  );
  const priceInput = page.getByTestId(`${id}-pizza-edit-price`);
  const submit = page.getByTestId(`${id}-pizza-edit-validate-button`);
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

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export const diets = ["normal", "pescoVegetarian", "vegetarian", "vegan"];
