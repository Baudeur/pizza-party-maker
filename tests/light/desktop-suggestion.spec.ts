import test, { expect, Locator } from "@playwright/test";
import {
  defaultURLLight,
  setLightPeople,
  setQuantityTo,
  sliceToNumber,
} from "../test-utils";

test("Suggestion matches quantity", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const quantitySelector = page.getByTestId("light-quantity-selector");
  const suggestionNormal = page.getByTestId(
    "light-suggestion-display-quantity-normal"
  );
  const suggestionPescoVegetarian = page.getByTestId(
    "light-suggestion-display-quantity-pescoVegetarian"
  );
  const suggestionVegeterian = page.getByTestId(
    "light-suggestion-display-quantity-vegetarian"
  );
  const suggestionVegan = page.getByTestId(
    "light-suggestion-display-quantity-vegan"
  );

  await setLightPeople(page, 2, 3, 2, 1);
  await compute.click();
  let normal = Number(await suggestionNormal.textContent());
  let pescoVegetarian = Number(await suggestionPescoVegetarian.textContent());
  let vegetarian = Number(await suggestionVegeterian.textContent());
  let vegan = Number(await suggestionVegan.textContent());
  expect(normal + pescoVegetarian + vegetarian + vegan).toEqual(8);

  await page.reload();

  await setLightPeople(page, 2, 3, 2, 1);
  await setQuantityTo(quantitySelector, 12);
  await compute.click();
  normal = Number(await suggestionNormal.textContent());
  pescoVegetarian = Number(await suggestionPescoVegetarian.textContent());
  vegetarian = Number(await suggestionVegeterian.textContent());
  vegan = Number(await suggestionVegan.textContent());
  expect(normal + pescoVegetarian + vegetarian + vegan).toEqual(12);

  await page.reload();

  await setLightPeople(page, 2, 3, 2, 1);
  await setQuantityTo(quantitySelector, 2);
  await compute.click();
  normal = Number(await suggestionNormal.textContent());
  pescoVegetarian = Number(await suggestionPescoVegetarian.textContent());
  vegetarian = Number(await suggestionVegeterian.textContent());
  vegan = Number(await suggestionVegan.textContent());
  expect(normal + pescoVegetarian + vegetarian + vegan).toEqual(2);
});

test("Suggestion can be multiple types of pizzas", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const normalName = page.getByTestId("light-suggestion-display-name-normal");
  const normalIcons = page.getByTestId("light-suggestion-display-icons-normal");
  const pescoVegetarianName = page.getByTestId(
    "light-suggestion-display-name-pescoVegetarian"
  );
  const pescoVegetarianIcons = page.getByTestId(
    "light-suggestion-display-icons-pescoVegetarian"
  );
  const vegetarianName = page.getByTestId(
    "light-suggestion-display-name-vegetarian"
  );
  const vegetarianIcons = page.getByTestId(
    "light-suggestion-display-icons-vegetarian"
  );
  const veganName = page.getByTestId("light-suggestion-display-name-vegan");
  const veganIcons = page.getByTestId("light-suggestion-display-icons-vegan");

  // All four

  await setLightPeople(page, 6, 1, 1, 1);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^pizzas? with meat$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-normal.png"
  );
  await expect(pescoVegetarianName).toBeVisible();
  await expect(pescoVegetarianName).toHaveText(/^pesco-vegetarian pizzas?$/);
  await expect(pescoVegetarianIcons).toHaveScreenshot(
    "light-suggestion-display-icons-pescoVegetarian.png"
  );
  await expect(vegetarianName).toBeVisible();
  await expect(vegetarianName).toHaveText(/^vegetarian pizzas?$/);
  await expect(vegetarianIcons).toHaveScreenshot(
    "light-suggestion-display-icons-vegetarian.png"
  );
  await expect(veganName).toBeVisible();
  await expect(veganName).toHaveText(/^vegan pizzas?$/);
  await expect(veganIcons).toHaveScreenshot(
    "light-suggestion-display-icons-vegan.png"
  );
  await page.reload();

  // vegan AND non vegan

  await setLightPeople(page, 3, 0, 0, 1);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^non-vegan pizzas?$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-normal-pescoVegetarian-vegetarian.png"
  );
  await expect(pescoVegetarianName).not.toBeVisible();
  await expect(vegetarianName).not.toBeVisible();
  await expect(veganName).toBeVisible();
  await expect(veganName).toHaveText(/^vegan pizzas?$/);
  await expect(veganIcons).toHaveScreenshot(
    "light-suggestion-display-icons-vegan-3.png"
  );
  await page.reload();

  // meat AND non meat

  await setLightPeople(page, 3, 1, 0, 0);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^pizzas? with meat$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-normal-3.png"
  );
  await expect(pescoVegetarianName).toBeVisible();
  await expect(pescoVegetarianName).toHaveText(/^pizzas? without meat$/);
  await expect(pescoVegetarianIcons).toHaveScreenshot(
    "light-suggestion-display-icons-pescoVegetarian-vegetarian-vegan.png"
  );
  await expect(vegetarianName).not.toBeVisible();
  await expect(veganName).not.toBeVisible();
  await page.reload();

  // meat-fish AND vegetarian-vegan

  await setLightPeople(page, 3, 0, 1, 0);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^pizzas? with meat \/ fish$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-normal-pescoVegetarian.png"
  );
  await expect(pescoVegetarianName).not.toBeVisible();
  await expect(vegetarianName).toBeVisible();
  await expect(vegetarianName).toHaveText(/^vegetarian \/ vegan pizzas?$/);
  await expect(vegetarianIcons).toHaveScreenshot(
    "light-suggestion-display-icons-vegetarian-vegan.png"
  );
  await expect(veganName).not.toBeVisible();
  await page.reload();

  // vegetarian-pescoVegetarian

  await setLightPeople(page, 4, 1, 0, 1);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^pizzas? with meat$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-normal-2.png"
  );
  await expect(pescoVegetarianName).toBeVisible();
  await expect(pescoVegetarianName).toHaveText(
    /^pesco-vegetarian \/ vegetarian pizzas?$/
  );
  await expect(pescoVegetarianIcons).toHaveScreenshot(
    "light-suggestion-display-icons-pescoVegetarian-vegetarian.png"
  );
  await expect(vegetarianName).not.toBeVisible();
  await expect(veganName).toBeVisible();
  await expect(veganName).toHaveText(/^vegan pizzas?$/);
  await expect(veganIcons).toHaveScreenshot(
    "light-suggestion-display-icons-vegan-2.png"
  );
  await page.reload();

  // (everything-everywhere ;) ) All at once

  await setLightPeople(page, 1, 0, 0, 0);
  await compute.click();
  await expect(normalName).toBeVisible();
  await expect(normalName).toHaveText(/^pizzas? of any kind$/);
  await expect(normalIcons).toHaveScreenshot(
    "light-suggestion-display-icons-all-at-once.png"
  );
  await expect(pescoVegetarianName).not.toBeVisible();
  await expect(vegetarianName).not.toBeVisible();
  await expect(veganName).not.toBeVisible();
});

test("Suggestion is fair enough", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const normal = page.getByTestId("light-pizza-flag-normal");
  const pescoVegetarian = page.getByTestId("light-pizza-flag-pescoVegetarian");
  const vegetarian = page.getByTestId("light-pizza-flag-vegetarian");
  const vegan = page.getByTestId("light-pizza-flag-vegan");

  await setLightPeople(page, 4, 3, 1, 3);
  await compute.click();

  const normalSlices = await sliceToNumber(normal);
  const pescoVegetarianSlices = await sliceToNumber(pescoVegetarian);
  const vegetarianSlices = await sliceToNumber(vegetarian);
  const veganSlices = await sliceToNumber(vegan);

  let max = Math.max(
    normalSlices,
    pescoVegetarianSlices,
    vegetarianSlices,
    veganSlices
  );
  let min = Math.min(
    normalSlices,
    pescoVegetarianSlices,
    vegetarianSlices,
    veganSlices
  );
  const ratio = max / min;
  expect(ratio).toBeLessThan(1.11);
});

test("More fair is disabled", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const moreFair = page.getByTestId("light-more-fair-button");

  await setLightPeople(page, 4, 3, 1, 3);
  await compute.click();
  await expect(moreFair).toBeDisabled();
});

test("Restart works", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const restart = page.getByTestId("light-restart-button");

  await setLightPeople(page, 4, 3, 1, 3);
  await compute.click();
  await expect(restart).toBeVisible();
  await restart.click();
  await expect(compute).toBeVisible();
});
