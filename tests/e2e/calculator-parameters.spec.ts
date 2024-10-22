import { test, expect } from "@playwright/test";
import { createPizza, setPeople } from "./test-utils";

test("Parameters are visible", async ({ page }) => {
  await page.goto("localhost:5173");
  const parametersExpand = page.getByTestId("parameters-expand");
  await parametersExpand.click();
  const parametersInput = page.getByTestId("parameters-input");
  await expect(parametersInput).toBeVisible();
});

test("Parameters can't go lower than 1 or higher than 16", async ({ page }) => {
  await page.goto("localhost:5173");
  const parametersExpand = page.getByTestId("parameters-expand");
  await parametersExpand.click();
  const parametersInput = page.getByTestId("parameters-input");
  const parametersMinus = page.getByTestId("parameters-minus");
  const parametersPlus = page.getByTestId("parameters-plus");
  await parametersInput.fill("0");
  await expect(parametersInput).toHaveValue("1");
  await parametersMinus.click();
  await expect(parametersInput).toHaveValue("1");
  await parametersInput.fill("17");
  await expect(parametersInput).toHaveValue("16");
  await parametersPlus.click();
  await expect(parametersInput).toHaveValue("16");
});

test("Parameters influences fields", async ({ page }) => {
  await page.goto("localhost:5173");
  await setPeople(page, 1, 0, 0, 0);
  await createPizza(page, 1);
  const parametersExpand = page.getByTestId("parameters-expand");
  await parametersExpand.click();
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const quantityFlagSlice = page.getByTestId("quantity-flag-slices");
  const worstCaseScenarioQuantity = page.getByTestId("worst-case-normal-value");
  const parametersInput = page.getByTestId("parameters-input");
  await expect(quantityFlagSlice).toHaveText("8 slices");
  await expect(worstCaseScenarioQuantity).toHaveText("8");
  await parametersInput.fill("10");
  await expect(quantityFlagSlice).toHaveText("10 slices");
  await expect(worstCaseScenarioQuantity).toHaveText("10");
});
