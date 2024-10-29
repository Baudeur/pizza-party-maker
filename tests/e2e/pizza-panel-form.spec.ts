import { test, expect } from "@playwright/test";
import { checkPizza } from "./test-utils";

test("The pizza panel is visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const pizzaPanel = page.getByTestId("pizza-panel");
  await expect(pizzaPanel).toBeVisible();
});

// #### Diet selector tests ####

test("User can select the diet of the pizza with arrow key and the mouse", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const dietInput = page.getByTestId("pizza-form-diet");
  const pescoVegetarianButton = page.getByTestId(
    "pizza-form-diet-pescoVegetarian-button"
  );
  const vegetarianButton = page.getByTestId(
    "pizza-form-diet-vegetarian-button"
  );
  await vegetarianButton.click();
  await expect(
    vegetarianButton.getByAltText("coloured vegetarian icon")
  ).toBeVisible();
  await expect(
    pescoVegetarianButton.getByAltText("coloured pesco‑vegetarian icon")
  ).toBeVisible();

  await dietInput.press("ArrowLeft");
  await expect(
    vegetarianButton.getByAltText("grayed out vegetarian icon")
  ).toBeVisible();
});

test("User cannot unselect normal diet", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const dietInput = page.getByTestId("pizza-form-diet");
  const normalButton = page.getByTestId("pizza-form-diet-normal-button");
  await dietInput.press("ArrowLeft");
  await expect(
    normalButton.getByAltText("coloured omnivorous icon")
  ).toBeVisible();
});

// #### Price input tests ####

test("User can enter price with decimals", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const priceInput = page.getByTestId("pizza-form-price");
  await priceInput.fill("15.23");
  await expect(priceInput).toHaveValue("15.23");

  await priceInput.clear();
  await priceInput.pressSequentially("15.");
  await expect(priceInput).toHaveValue("15.");
  await priceInput.pressSequentially("00");
  await expect(priceInput).toHaveValue("15.00");
  await priceInput.press("Backspace");
  await priceInput.pressSequentially("1");
  await expect(priceInput).toHaveValue("15.01");
});

test("User cannot go over two decimal number", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const priceInput = page.getByTestId("pizza-form-price");
  await priceInput.fill("15.235");
  await expect(priceInput).toHaveValue("15.24");
});

test("User cannot go over 999 or below 0", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const priceInput = page.getByTestId("pizza-form-price");
  await priceInput.fill("1500");
  await expect(priceInput).toHaveValue("999");
  await priceInput.clear();
  await priceInput.fill("-4");
  await expect(priceInput).toHaveValue("");
});

test("User cannot enter letters", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const priceInput = page.getByTestId("pizza-form-price");
  await priceInput.fill("Salut");
  await expect(priceInput).toHaveValue("");
});

// #### Whole form tests ####

test("User can add a pizza", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const quantityInput = page.getByTestId("pizza-form-quantity-input");
  const nameInput = page.getByTestId("pizza-form-name");
  const dietInput = page.getByTestId("pizza-form-diet");
  const dietInputButton = page.getByTestId("pizza-form-diet-vegetarian-button");
  const priceInput = page.getByTestId("pizza-form-price");
  const submit = page.getByTestId("pizza-form-submit");
  await quantityInput.fill("2");
  await nameInput.fill("4 Cheese");
  await dietInputButton.click();
  await dietInput.press("ArrowLeft");
  await priceInput.fill("12.20");
  await submit.click();
  await page.mouse.move(0, 0);
  await checkPizza(page, 0, 2, "4 Cheese", "pescoVegetarian", "12.20");
});

test("User can add a pizza using only the keyboard", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const quantityInput = page.getByTestId("pizza-form-quantity-input");
  await quantityInput.click();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("2");
  await page.keyboard.press("Tab");
  await page.keyboard.type("4 Cheese");
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Tab");
  await page.keyboard.type("12");
  await page.keyboard.press("Enter");
  await checkPizza(page, 0, 12, "4 Cheese", "vegetarian", "12");
});

test("Pizza can have empty name and price", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const submit = page.getByTestId("pizza-form-submit");
  await submit.click();
  await page.mouse.move(0, 0);
  await checkPizza(page, 0, 1, "", "normal", "0");
});

test("Pizza can have duplicate names", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const submit = page.getByTestId("pizza-form-submit");
  const nameInput = page.getByTestId("pizza-form-name");
  await nameInput.fill("4 Cheese");
  await submit.click();
  await nameInput.fill("4 Cheese");
  await submit.click();
  await page.mouse.move(0, 0);
  await checkPizza(page, 0, 1, "4 Cheese", "normal", "0");
  await checkPizza(page, 1, 1, "4 Cheese", "normal", "0");
});

test("If pizza price has decimals show two decimals otherwise 0", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const submit = page.getByTestId("pizza-form-submit");
  const priceInput = page.getByTestId("pizza-form-price");
  await priceInput.fill("15");
  await submit.click();
  await priceInput.fill("13.");
  await submit.click();
  await priceInput.fill("13.1");
  await submit.click();
  await priceInput.fill("13.20");
  await submit.click();
  await priceInput.fill("13.15");
  await submit.click();
  await page.mouse.move(0, 0);
  await checkPizza(page, 0, 1, "", "normal", "15");
  await checkPizza(page, 1, 1, "", "normal", "13");
  await checkPizza(page, 2, 1, "", "normal", "13.10");
  await checkPizza(page, 3, 1, "", "normal", "13.20");
  await checkPizza(page, 4, 1, "", "normal", "13.15");
});
