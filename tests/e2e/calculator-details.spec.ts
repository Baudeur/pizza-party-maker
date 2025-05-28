import { test, expect } from "@playwright/test";
import { createPizza, setPeople } from "./test-utils";

test("The four case scenario are displayed", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const worstCase = page.getByTestId("worst-case");
  const randomCase = page.getByTestId("random-case");
  const averageCase = page.getByTestId("average-case");
  const bestCase = page.getByTestId("best-case");
  await expect(worstCase).toBeVisible();
  await expect(randomCase).toBeVisible();
  await expect(averageCase).toBeVisible();
  await expect(bestCase).toBeVisible();
});

test("The worst case scenario is correct (deterministic)", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 0, 1, "", "normal");
  await createPizza(page, 1, 1, "", "pescoVegetarian");
  await createPizza(page, 2, 1, "", "vegetarian");
  await createPizza(page, 3, 1, "", "vegan");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const normalValue = page.getByTestId("worst-case-normal-value");
  const pescoVegetarianValue = page.getByTestId(
    "worst-case-pescoVegetarian-value"
  );
  const vegetarianValue = page.getByTestId("worst-case-vegetarian-value");
  const veganValue = page.getByTestId("worst-case-vegan-value");
  await expect(normalValue).toContainText("17");
  await expect(pescoVegetarianValue).toContainText("9");
  await expect(vegetarianValue).toContainText("4");
  await expect(veganValue).toContainText("2");
});

test("The best case scenario is correct (deterministic)", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 0, 1, "", "normal");
  await createPizza(page, 1, 1, "", "pescoVegetarian");
  await createPizza(page, 2, 1, "", "vegetarian");
  await createPizza(page, 3, 1, "", "vegan");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const normalValue = page.getByTestId("best-case-normal-value");
  const pescoVegetarianValue = page.getByTestId(
    "best-case-pescoVegetarian-value"
  );
  const vegetarianValue = page.getByTestId("best-case-vegetarian-value");
  const veganValue = page.getByTestId("best-case-vegan-value");
  await expect(normalValue).toContainText("8");
  await expect(pescoVegetarianValue).toContainText("8");
  await expect(vegetarianValue).toContainText("8");
  await expect(veganValue).toContainText("8");
});

test("The random case scenario is correct", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 0, 1, "", "normal");
  await createPizza(page, 1, 1, "", "pescoVegetarian");
  await createPizza(page, 2, 1, "", "vegetarian");
  await createPizza(page, 3, 1, "", "vegan");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const normalValue = await page
    .getByTestId("random-case-normal-value")
    .textContent();
  const pescoVegetarianValue = await page
    .getByTestId("random-case-pescoVegetarian-value")
    .textContent();
  const vegetarianValue = await page
    .getByTestId("random-case-vegetarian-value")
    .textContent();
  const veganValue = await page
    .getByTestId("random-case-vegan-value")
    .textContent();
  expect(checkNumberIsIn(normalValue, 9, 15)).toBeTruthy();
  expect(checkNumberIsIn(pescoVegetarianValue, 6, 11)).toBeTruthy();
  expect(checkNumberIsIn(vegetarianValue, 4, 9)).toBeTruthy();
  expect(checkNumberIsIn(veganValue, 2, 7)).toBeTruthy();
});

test("The average case scenario is correct", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 1, 1);
  await createPizza(page, 0, 1, "", "normal");
  await createPizza(page, 1, 1, "", "pescoVegetarian");
  await createPizza(page, 2, 1, "", "vegetarian");
  await createPizza(page, 3, 1, "", "vegan");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const normalValue = await page
    .getByTestId("average-case-normal-value")
    .textContent();
  const pescoVegetarianValue = await page
    .getByTestId("average-case-pescoVegetarian-value")
    .textContent();
  const vegetarianValue = await page
    .getByTestId("average-case-vegetarian-value")
    .textContent();
  const veganValue = await page
    .getByTestId("average-case-vegan-value")
    .textContent();
  expect(checkNumberIsIn(normalValue, 12, 13)).toBeTruthy();
  expect(checkNumberIsIn(pescoVegetarianValue, 8, 9)).toBeTruthy();
  expect(checkNumberIsIn(vegetarianValue, 6, 7)).toBeTruthy();
  expect(checkNumberIsIn(veganValue, 4, 5)).toBeTruthy();
});

function checkNumberIsIn(
  number: string | null,
  lowerLimit: number,
  higherLimit: number
): boolean {
  if (number === null) return false;
  const num = Number(number);
  if (Number.isNaN(num)) return false;
  return num >= lowerLimit && num <= higherLimit;
}
