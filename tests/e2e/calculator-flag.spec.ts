import { test, expect } from "@playwright/test";
import { createPizza, setPeople } from "./test-utils";

test("All flags are present and contains image", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const normalFlag = page.getByTestId("normal-flag-container");
  const pescoVegetarianFlag = page.getByTestId(
    "pescoVegetarian-flag-container"
  );
  const vegetarianFlag = page.getByTestId("vegetarian-flag-container");
  const veganFlag = page.getByTestId("vegan-flag-container");
  const priceFlag = page.getByTestId("price-flag-container");
  const quantityFlag = page.getByTestId("quantity-flag-container");
  await expect(normalFlag).toBeVisible();
  await expect(pescoVegetarianFlag).toBeVisible();
  await expect(vegetarianFlag).toBeVisible();
  await expect(veganFlag).toBeVisible();
  await expect(priceFlag).toBeVisible();
  await expect(quantityFlag).toBeVisible();
  await expect(
    normalFlag.getByAltText("coloured omnivorous icon")
  ).toBeVisible();
  await expect(
    pescoVegetarianFlag.getByAltText("coloured pesco‑vegetarian icon")
  ).toBeVisible();
  await expect(
    vegetarianFlag.getByAltText("coloured vegetarian icon")
  ).toBeVisible();
  await expect(veganFlag.getByAltText("coloured vegan icon")).toBeVisible();
  await expect(priceFlag.getByAltText("Price")).toBeVisible();
  await expect(quantityFlag.getByAltText("Quantity")).toBeVisible();
});

test("When a diet is not present, the flag presents N/A", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const vegetarianFlag = page.getByTestId("vegetarian-flag");
  await expect(vegetarianFlag).toHaveText("N/A❌");
});

test("When a diet can't eat, the flag presents can't eat", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 0, 1, 0, 0);
  const pescoVegetarianFlag = page.getByTestId("pescoVegetarian-flag");
  await expect(pescoVegetarianFlag).toHaveText("Can't eat💀");
});

test("Flags can have 4 quality states", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  await createPizza(page, 1);
  await createPizza(page, 2, "", "pescoVegetarian");
  await createPizza(page, 3, "", "vegetarian");
  await createPizza(page, 1, "", "vegan");
  const normalFlag = page.getByTestId("normal-flag");
  const pescoVegetarianFlag = page.getByTestId("pescoVegetarian-flag");
  const vegetarianFlag = page.getByTestId("vegetarian-flag");
  const veganFlag = page.getByTestId("vegan-flag");
  await expect(normalFlag).toHaveText("Perfect👌");
  await expect(pescoVegetarianFlag).toHaveText("Good😊");
  await expect(vegetarianFlag).toHaveText("Okay😕");
  await expect(veganFlag).toHaveText("Bad😖");
});

test("Price flag is correct", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 1, "", "normal", "14");
  await createPizza(page, 1, "", "vegetarian", "11");
  const priceFlag = page.getByTestId("price-flag-per-person");
  const priceFlagTotal = page.getByTestId("price-flag-total");
  await expect(priceFlag).toHaveText("6.25€ / pers");
  await expect(priceFlagTotal).toHaveText("25€ total");
});

test("Quantity flag is correct", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 1, "", "normal", "14");
  await createPizza(page, 2, "", "vegetarian", "11");
  const quantityFlagSlice = page.getByTestId("quantity-flag-slices");
  const quantityFlagPizza = page.getByTestId("quantity-flag-pizzas");
  await expect(quantityFlagSlice).toHaveText("6 slices");
  await expect(quantityFlagPizza).toHaveText("~3/4 pizzas");
});
