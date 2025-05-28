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
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const dietInput = page.getByTestId("0-pizza-edit-diet");
  const pescoVegetarianButton = page.getByTestId(
    "0-pizza-edit-diet-pescoVegetarian-button"
  );
  const vegetarianButton = page.getByTestId(
    "0-pizza-edit-diet-vegetarian-button"
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
    vegetarianButton.getByAltText("black and white vegetarian icon")
  ).toBeVisible();
});

test("User cannot unselect normal diet", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const dietInput = page.getByTestId("0-pizza-edit-diet");
  const normalButton = page.getByTestId("0-pizza-edit-diet-normal-button");
  await dietInput.press("ArrowLeft");
  await expect(
    normalButton.getByAltText("coloured omnivorous icon")
  ).toBeVisible();
});

// #### Price input tests ####

test("User can enter price with decimals", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const priceInput = page.getByTestId("0-pizza-edit-price");
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
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const priceInput = page.getByTestId("0-pizza-edit-price");
  await priceInput.fill("15.235");
  await expect(priceInput).toHaveValue("15.23");
});

test("User cannot go over 999 or below 0", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const priceInput = page.getByTestId("0-pizza-edit-price");
  await priceInput.fill("1500");
  await expect(priceInput).toHaveValue("999");
  await priceInput.clear();
  await priceInput.fill("-4");
  await expect(priceInput).toHaveValue("");
});

test("User cannot enter letters", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const priceInput = page.getByTestId("0-pizza-edit-price");
  await priceInput.fill("Salut");
  await expect(priceInput).toHaveValue("0");
});

// #### Whole form tests ####

test("User can add a pizza", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const quantityInput = page.getByTestId("0-pizza-edit-quantity-input");
  const nameInput = page.getByTestId("0-pizza-edit-name");
  const dietInput = page.getByTestId("0-pizza-edit-diet");
  const dietInputButton = page.getByTestId(
    "0-pizza-edit-diet-vegetarian-button"
  );
  const priceInput = page.getByTestId("0-pizza-edit-price");
  const submit = page.getByTestId("0-pizza-edit-validate-button");
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
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const quantityInput = page.getByTestId("0-pizza-edit-quantity-input");
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
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const submit = page.getByTestId("0-pizza-edit-validate-button");
  await submit.click();

  await checkPizza(page, 0, 1, "", "normal", "0");
});

test("Pizza can have duplicate names", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();

  const nameInput = page.getByTestId("0-pizza-edit-name");
  const validateButton = page.getByTestId("0-pizza-edit-validate-button");
  await nameInput.fill("4 Cheese");
  await validateButton.click();

  await addPizzaButton.click();
  const nameInput2 = page.getByTestId("1-pizza-edit-name");
  const validateButton2 = page.getByTestId("1-pizza-edit-validate-button");
  await nameInput2.fill("4 Cheese");
  await validateButton2.click();

  await checkPizza(page, 0, 1, "4 Cheese", "normal", "0");
  await checkPizza(page, 1, 1, "4 Cheese", "normal", "0");
});

test("If pizza price has decimals show two decimals otherwise 0", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const addPizzaButton = page.getByTestId("add-pizza-button");
  await addPizzaButton.click();
  const priceInput = page.getByTestId("0-pizza-edit-price");
  const validateButton = page.getByTestId("0-pizza-edit-validate-button");
  await priceInput.fill("15");
  await validateButton.click();

  await addPizzaButton.click();
  const priceInput1 = page.getByTestId("1-pizza-edit-price");
  const validateButton1 = page.getByTestId("1-pizza-edit-validate-button");
  await priceInput1.fill("13.");
  await validateButton1.click();

  await addPizzaButton.click();
  const priceInput2 = page.getByTestId("2-pizza-edit-price");
  const validateButton2 = page.getByTestId("2-pizza-edit-validate-button");
  await priceInput2.fill("13.1");
  await validateButton2.click();

  await addPizzaButton.click();
  const priceInput3 = page.getByTestId("3-pizza-edit-price");
  const validateButton3 = page.getByTestId("3-pizza-edit-validate-button");
  await priceInput3.fill("13.20");
  await validateButton3.click();

  await addPizzaButton.click();
  const priceInput4 = page.getByTestId("4-pizza-edit-price");
  const validateButton4 = page.getByTestId("4-pizza-edit-validate-button");
  await priceInput4.fill("13.15");
  await validateButton4.click();

  await page.mouse.move(0, 0);
  await checkPizza(page, 0, 1, "", "normal", "15");
  await checkPizza(page, 1, 1, "", "normal", "13");
  await checkPizza(page, 2, 1, "", "normal", "13.10");
  await checkPizza(page, 3, 1, "", "normal", "13.20");
  await checkPizza(page, 4, 1, "", "normal", "13.15");
});
