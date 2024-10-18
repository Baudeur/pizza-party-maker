import { test, expect } from "@playwright/test";
import { checkPizza, createPizza } from "./test-utils";

test("User can hover pizza to see interactions", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 1, "4 Cheese", "vegetarian", "12.50");
  const pizzaLine = page.getByTestId("0-pizza-display");
  await pizzaLine.hover();
  const quantityInput = page.getByTestId(
    "0-pizza-display-quantity-editable-input"
  );
  const editButton = page.getByTestId("0-pizza-display-edit-button");
  const deleteButton = page.getByTestId("0-pizza-display-delete-button");
  await expect(quantityInput).toBeVisible();
  await expect(editButton).toBeVisible();
  await expect(deleteButton).toBeVisible();
});

test("User can delete pizza in two ways", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 0);
  await createPizza(page, 0);
  const quantityMinusButton = page.getByTestId(
    "0-pizza-display-quantity-editable-minus"
  );
  const deleteButton = page.getByTestId("1-pizza-display-delete-button");
  const pizza0 = page.getByTestId("0-pizza-display");
  const pizza1 = page.getByTestId("1-pizza-display");
  await pizza0.hover();
  await quantityMinusButton.click();
  await pizza1.hover();
  await deleteButton.click();
  await expect(pizza0).not.toBeVisible();
  await expect(pizza1).not.toBeVisible();
});

test("User edit quantity without editing the pizza", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 0);
  const pizzaForm = page.getByTestId("pizza-form");
  const quantityMinusButton = page.getByTestId(
    "0-pizza-display-quantity-editable-minus"
  );
  const quantityPlusButton = page.getByTestId(
    "0-pizza-display-quantity-editable-plus"
  );
  const quantityInput = page.getByTestId(
    "0-pizza-display-quantity-editable-input"
  );
  const quantityDisplay = page.getByTestId("0-pizza-display-quantity");
  const pizza0 = page.getByTestId("0-pizza-display");
  await pizza0.hover();
  await quantityInput.fill("4");
  for (let i = 0; i < 3; i++) {
    await quantityPlusButton.click();
  }
  await quantityMinusButton.click();
  await pizzaForm.hover();
  await expect(quantityDisplay).toHaveText("6");
});

test("User can start editing pizza in two ways", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 1, "4 Cheese", "vegetarian", "10");
  await createPizza(page, 1, "Burrata", "vegan", "15");
  const pizza0 = page.getByTestId("0-pizza-display");
  const pizza0Edit = page.getByTestId("0-pizza-edit");
  const pizza1Edit = page.getByTestId("1-pizza-edit");
  const editButton = page.getByTestId("0-pizza-display-edit-button");
  const pizzaName = page.getByTestId("1-pizza-display-name");
  await pizza0.hover();
  await editButton.click();
  await pizzaName.dblclick();
  await expect(pizza0Edit).toBeVisible();
  await expect(pizza1Edit).toBeVisible();
});

test("User can edit fields and cancel", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 1, "4 Chrrse", "normal", "100");
  const pizza0 = page.getByTestId("0-pizza-display");
  const editButton = page.getByTestId("0-pizza-display-edit-button");

  const pizza0Edit = page.getByTestId("0-pizza-edit");
  const cancelButton = page.getByTestId("0-pizza-edit-cancel-button");
  const nameInput = page.getByTestId("0-pizza-edit-name");
  const dietButton = page.getByTestId("0-pizza-edit-diet-vegetarian-button");
  const priceInput = page.getByTestId("0-pizza-edit-price");

  await pizza0.hover();
  await editButton.click();
  await nameInput.fill("4 Cheese");
  await dietButton.click();
  await priceInput.fill("12");
  await cancelButton.click();
  await expect(pizza0Edit).not.toBeVisible();
  await checkPizza(page, 0, 1, "4 Chrrse", "normal", "100");

  await pizza0.hover();
  await editButton.click();
  await nameInput.fill("4 Cheese");
  await dietButton.click();
  await priceInput.fill("12");
  await pizza0Edit.press("Escape");
  await expect(pizza0Edit).not.toBeVisible();
  await checkPizza(page, 0, 1, "4 Chrrse", "normal", "100");
});

test("User can edit fields and validate", async ({ page }) => {
  await page.goto("localhost:5173");
  await createPizza(page, 1, "4 Chrrse", "normal", "100");
  const pizza0 = page.getByTestId("0-pizza-display");
  const editButton = page.getByTestId("0-pizza-display-edit-button");
  const nameDisplay = page.getByTestId("0-pizza-display-name");

  const pizza0Edit = page.getByTestId("0-pizza-edit");
  const validateButton = page.getByTestId("0-pizza-edit-validate-button");
  const nameInput = page.getByTestId("0-pizza-edit-name");
  const dietButton = page.getByTestId("0-pizza-edit-diet-vegetarian-button");
  const priceInput = page.getByTestId("0-pizza-edit-price");

  await pizza0.hover();
  await editButton.click();
  await nameInput.fill("4 Cheese");
  await dietButton.click();
  await priceInput.fill("12");
  await validateButton.click();
  await expect(pizza0Edit).not.toBeVisible();
  await checkPizza(page, 0, 1, "4 Cheese", "vegetarian", "12");

  await nameDisplay.dblclick();
  await page.keyboard.type(" but better");
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.type(".20");
  await page.keyboard.press("Enter");
  await expect(pizza0Edit).not.toBeVisible();
  await checkPizza(page, 0, 1, "4 Cheese but better", "vegan", "12.20");
});

test("Initial edit focus depend on where user double click", async ({
  page,
}) => {
  await page.goto("localhost:5173");
  await createPizza(page, 1, "4 Chrrse", "normal", "100");
  const pizza0Edit = page.getByTestId("0-pizza-edit");
  const nameDisplay = page.getByTestId("0-pizza-display-name");
  const dietDisplay = page.getByTestId("0-pizza-display-diet");
  const priceDisplay = page.getByTestId("0-pizza-display-price");
  const nameEdit = page.getByTestId("0-pizza-edit-name");
  const dietEdit = page.getByTestId("0-pizza-edit-diet");
  const priceEdit = page.getByTestId("0-pizza-edit-price");
  await nameDisplay.dblclick();
  await expect(nameEdit).toBeFocused();
  await pizza0Edit.press("Escape");
  await dietDisplay.dblclick();
  await expect(dietEdit).toBeFocused();
  await pizza0Edit.press("Escape");
  await priceDisplay.dblclick();
  await expect(priceEdit).toBeFocused();
  await pizza0Edit.press("Escape");
});

test("Header and footer should always be visible", async ({ page }) => {
  await page.goto("localhost:5173");
  const pizzaHeader = page.getByTestId("pizza-header");
  const pizzaFooter = page.getByTestId("pizza-footer");
  const pizza0 = page.getByTestId("0-pizza-display");
  const pizza14 = page.getByTestId("14-pizza-display");
  const pizzaAdd = page.getByTestId("pizza-form-submit");
  for (let i = 0; i < 15; i++) {
    await pizzaAdd.click();
  }
  await pizza0.scrollIntoViewIfNeeded();
  await expect(pizzaHeader).toBeVisible();
  await expect(pizzaFooter).toBeVisible();
  await pizza14.scrollIntoViewIfNeeded();
  await expect(pizzaHeader).toBeVisible();
  await expect(pizzaFooter).toBeVisible();
});
