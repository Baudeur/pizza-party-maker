import { test, expect } from "@playwright/test";

test("All flags are present and contains image", async ({ page }) => {
  await page.goto("localhost:5173");
  const normalFlag = page.getByTestId("normal-flag");
  const pescoVegetarianFlag = page.getByTestId("pescoVegetarian-flag");
  const vegetarianFlag = page.getByTestId("vegetarian-flag");
  const veganFlag = page.getByTestId("vegan-flag");
  const priceFlag = page.getByTestId("price-flag");
  const quantityFlag = page.getByTestId("quantity-flag");
  await expect(normalFlag).toBeVisible();
  await expect(pescoVegetarianFlag).toBeVisible();
  await expect(vegetarianFlag).toBeVisible();
  await expect(veganFlag).toBeVisible();
  await expect(priceFlag).toBeVisible();
  await expect(quantityFlag).toBeVisible();
  //TODO: Add flag icons.
});

//Flags are independant
//If can't eat
//Example of perfect good okay bad
//check price are accurate
//check slices are accurate

test("When a diet is not present, the flag presents N/A", async ({ page }) => {
  await page.goto("localhost:5173");
  const vegetarianFlag = page.getByTestId("vegetarian-flag");
  await expect(vegetarianFlag).toHaveText("N/A❌");
});
