import { test, expect } from "@playwright/test";
import { defaultURL } from "../test-utils";

test("The people panel is visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const peoplePanel = page.getByTestId("people-panel");
  await expect(peoplePanel).toBeVisible();
});

test("User can change people number with buttons", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const plusButton = page.getByTestId("people-category-vegetarian-plus");
  const minusButton = page.getByTestId("people-category-vegetarian-minus");
  const input = page.getByTestId("people-category-vegetarian-input");
  for (let i = 0; i < 8; i++) {
    await plusButton.click();
  }
  for (let i = 0; i < 3; i++) {
    await minusButton.click();
  }
  await expect(input).toHaveValue("5");
});

test("User can change people count with direct input", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const input = page.getByTestId("people-category-vegan-input");
  await input.fill("45");
  await expect(input).toHaveValue("45");
  await input.clear();
  await expect(input).toHaveValue("0");
});

test("User cannot go below 0 or over 99", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const plusButton = page.getByTestId("people-category-normal-plus");
  const minusButton = page.getByTestId("people-category-normal-minus");
  const input = page.getByTestId("people-category-normal-input");
  await expect(minusButton).toBeDisabled();
  await input.fill("-1");
  await expect(input).toHaveValue("0");
  await input.fill("100");
  await expect(input).toHaveValue("99");
  await expect(plusButton).toBeDisabled();
});

test("User cannot enter decimal numbers", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const input = page.getByTestId("people-category-normal-input");
  await input.fill("15.");
  await expect(input).toHaveValue("15");
  await input.fill(".45");
  await expect(input).toHaveValue("0");
});

test("User cannot enter letters", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const input = page.getByTestId("people-category-vegetarian-input");
  await input.fill("Salut");
  await expect(input).toHaveValue("0");
});

test("The total count is accurate", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const normalInput = page.getByTestId("people-category-normal-input");
  const pescoVegetarianPlusButton = page.getByTestId(
    "people-category-pescoVegetarian-plus"
  );
  const pescoVegetarianMinusButton = page.getByTestId(
    "people-category-pescoVegetarian-minus"
  );
  const vegetarianPlusButton = page.getByTestId(
    "people-category-vegetarian-plus"
  );
  const veganInput = page.getByTestId("people-category-vegan-input");
  const total = page.getByTestId("people-total");
  await normalInput.fill("5");
  await pescoVegetarianPlusButton.click();
  await pescoVegetarianPlusButton.click();
  await pescoVegetarianMinusButton.click();
  for (let i = 0; i < 3; i++) {
    await vegetarianPlusButton.click();
  }
  await veganInput.press("ArrowRight");
  await veganInput.pressSequentially("45");
  await veganInput.press("Backspace");
  await expect(total).toHaveText("Total: 13");
});
