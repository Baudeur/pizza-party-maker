import test, { expect, Locator } from "@playwright/test";
import { defaultURLLight, setLightPeople, setQuantityTo } from "../test-utils";

test("User can enter diets", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const plusButton = page.getByTestId("light-people-category-vegetarian-plus");
  const minusButton = page.getByTestId(
    "light-people-category-vegetarian-minus"
  );
  const input = page.getByTestId("light-people-category-vegetarian-input");
  await expect(input).toHaveValue("0");
  for (let i = 0; i < 8; i++) {
    await plusButton.click();
  }
  await expect(input).toHaveValue("8");
  for (let i = 0; i < 3; i++) {
    await minusButton.click();
  }
  await expect(input).toHaveValue("5");
  await input.fill("15");
  await expect(input).toHaveValue("15");
});

test("User can't put diets higher than 99 and lower than 0, and can't enter text", async ({
  page,
  isMobile,
}) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const plusButton = page.getByTestId("light-people-category-vegetarian-plus");
  const minusButton = page.getByTestId(
    "light-people-category-vegetarian-minus"
  );
  const input = page.getByTestId("light-people-category-vegetarian-input");
  await expect(input).toHaveValue("0");
  if (!isMobile) {
    await input.fill("Bonjour");
    await expect(input).toHaveValue("0");
  }
  await expect(minusButton).toBeDisabled();
  await input.fill("-4");
  await expect(input).toHaveValue("0");
  await input.fill("104");
  await expect(input).toHaveValue("99");
  await expect(plusButton).toBeDisabled();
});

test("User can set pizza quantity", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const quantitySelector = page.getByTestId("light-quantity-selector");
  const icon = page.getByTestId("light-quantity-selector-icon");
  await setQuantityTo(quantitySelector, 1);
  await expect(icon).toHaveScreenshot("light-quantity-selector-1.png");
  await setQuantityTo(quantitySelector, 10);
  await expect(icon).toHaveScreenshot("light-quantity-selector-10.png");
  await setQuantityTo(quantitySelector, 16);
  await expect(icon).toHaveScreenshot("light-quantity-selector-16.png");
});

test("User can't set pizza quantity to less than 1 or more than 16", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const quantitySelector = page.getByTestId("light-quantity-selector");
  const icon = page.getByTestId("light-quantity-selector-icon");
  await setQuantityTo(quantitySelector, 1);
  await page.keyboard.press("ArrowLeft");
  await expect(icon).toHaveScreenshot("light-quantity-selector-1.png");
  await setQuantityTo(quantitySelector, 16);
  await page.keyboard.press("ArrowRight");
  await expect(icon).toHaveScreenshot("light-quantity-selector-16.png");
});

test("User can't compute if no people entered", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const errorMessage = page.getByTestId("light-0-people");

  await expect(compute).toBeDisabled();
  await expect(errorMessage).toBeVisible();
  await setLightPeople(page, 0, 0, 1, 0);

  await expect(compute).not.toBeDisabled();
  await expect(errorMessage).not.toBeVisible();
});

test("When computing, loads then don't display form", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const spinner = page.getByTestId("light-spinner");

  await setLightPeople(page, 4, 3, 1, 2);
  await compute.click();

  await expect(spinner).toBeVisible();
  await expect(spinner).not.toBeVisible();
  await expect(compute).not.toBeVisible();
});
