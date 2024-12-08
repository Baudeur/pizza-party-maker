import { test, expect, Locator, Page } from "@playwright/test";
import { createPizza, setPeople } from "./test-utils";

test("Parameters are visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const parametersInput = page.getByTestId("slice-parameter-input");
  const fairnessParameter = page.getByTestId("fairness-parameter");
  await expect(parametersInput).toBeVisible();
  await expect(fairnessParameter).toBeVisible();
});

test("Slice parameter can't go lower than 1 or higher than 16", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const parametersInput = page.getByTestId("slice-parameter-input");
  const parametersMinus = page.getByTestId("slice-parameter-minus");
  const parametersPlus = page.getByTestId("slice-parameter-plus");
  await parametersInput.fill("0");
  await expect(parametersInput).toHaveValue("1");
  await parametersMinus.click();
  await expect(parametersInput).toHaveValue("1");
  await parametersInput.fill("17");
  await expect(parametersInput).toHaveValue("16");
  await parametersPlus.click();
  await expect(parametersInput).toHaveValue("16");
});

test("Slice parameter influences fields", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 0, 0, 0);
  await createPizza(page, 1);
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const quantityFlagSlice = page.getByTestId("quantity-flag-slices");
  const worstCaseScenarioQuantity = page.getByTestId("worst-case-normal-value");
  const parametersInput = page.getByTestId("slice-parameter-input");
  await expect(quantityFlagSlice).toHaveText("8 slices");
  await expect(worstCaseScenarioQuantity).toHaveText("8");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  await parametersInput.fill("10");
  const parametersBackground = page.getByTestId("param-overlay-background");
  await parametersBackground.click({ position: { x: 0, y: 0 } });
  await expect(quantityFlagSlice).toHaveText("10 slices");
  await expect(worstCaseScenarioQuantity).toHaveText("10");
});

test("Fairness parameter can be changed by mouse or keyboard", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const fairnessParameter = page.getByTestId("fairness-parameter");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  const fairnessCursor1 = page.getByTestId("fairness-parameter-cursor1");
  const fairnessCursor2 = page.getByTestId("fairness-parameter-cursor2");
  await setCursorTo(page, fairnessCursor1, moveArea, 110);
  await setCursorTo(page, fairnessCursor2, moveArea, 175);
  await expect(fairnessParameter).toContainText("110%");
  await expect(fairnessParameter).toContainText("175%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-moved-by-mouse.png"
  );
  await fairnessCursor1.click();
  await page.keyboard.press("ArrowRight");
  await fairnessCursor2.click();
  await page.keyboard.press("ArrowLeft");
  await expect(fairnessParameter).toContainText("115%");
  await expect(fairnessParameter).toContainText("170%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-moved-by-keyboard.png"
  );
});

test("Fairness parameter can be changed by clicking on graph", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const fairnessParameter = page.getByTestId("fairness-parameter");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  await clickOnValue(page, moveArea, 110);
  await clickOnValue(page, moveArea, 175);
  await expect(fairnessParameter).toContainText("110%");
  await expect(fairnessParameter).toContainText("175%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-moved-by-click-ext.png"
  );
  await clickOnValue(page, moveArea, 120);
  await clickOnValue(page, moveArea, 165);
  await expect(fairnessParameter).toContainText("120%");
  await expect(fairnessParameter).toContainText("165%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-moved-by-click-int.png"
  );
});

test("Fairness parameter can't go lower than 105 or higher than 200", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const fairnessParameter = page.getByTestId("fairness-parameter");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  const fairnessCursor1 = page.getByTestId("fairness-parameter-cursor1");
  const fairnessCursor2 = page.getByTestId("fairness-parameter-cursor2");
  await setCursorTo(page, fairnessCursor1, moveArea, 95);
  await setCursorTo(page, fairnessCursor2, moveArea, 210);
  await expect(fairnessParameter).toContainText("105%");
  await expect(fairnessParameter).toContainText("200%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-limit-mouse.png"
  );
  await fairnessCursor1.click();
  await page.keyboard.press("ArrowLeft");
  await fairnessCursor2.click();
  await page.keyboard.press("ArrowRight");
  await expect(fairnessParameter).toContainText("105%");
  await expect(fairnessParameter).toContainText("200%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-limit-keyboard.png"
  );
});

test("Fairness parameter can't cross", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const fairnessParameter = page.getByTestId("fairness-parameter");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  const fairnessCursor1 = page.getByTestId("fairness-parameter-cursor1");
  const fairnessCursor2 = page.getByTestId("fairness-parameter-cursor2");
  await setCursorTo(page, fairnessCursor1, moveArea, 155);
  await setCursorTo(page, fairnessCursor2, moveArea, 145);
  await expect(fairnessParameter).toContainText("150%");
  await expect(fairnessParameter).not.toContainText("145%");
  await expect(fairnessParameter).not.toContainText("155%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-cross-mouse.png"
  );
  //Needed to make first cursor visible
  await setCursorTo(page, fairnessCursor2, moveArea, 155);
  await fairnessCursor1.click();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await fairnessCursor2.click();
  await page.keyboard.press("ArrowLeft");
  await expect(fairnessParameter).toContainText("155%");
  await expect(fairnessParameter).not.toContainText("150%");
  await expect(fairnessParameter).not.toContainText("160%");
  await expect(fairnessParameter).toHaveScreenshot(
    "fairness-parameter-cross-keyboard.png"
  );
});

test("Fairness parameter can be reset to default", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const parametersButton = page.getByTestId("param-overlay-button");
  await parametersButton.click();
  const fairnessParameter = page.getByTestId("fairness-parameter");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  const fairnessCursor1 = page.getByTestId("fairness-parameter-cursor1");
  const fairnessCursor2 = page.getByTestId("fairness-parameter-cursor2");
  await setCursorTo(page, fairnessCursor1, moveArea, 150);
  await setCursorTo(page, fairnessCursor2, moveArea, 170);
  await expect(fairnessParameter).toContainText("150%");
  await expect(fairnessParameter).toContainText("170%");
  const resetButton = page.getByTestId("params-fairness-reset-button");
  await resetButton.click();
  await expect(fairnessParameter).toContainText("125%");
  await expect(fairnessParameter).toContainText("150%");
});

test("Fairness parameter influences flags", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 1, 0, 0);
  await createPizza(page, 1);
  await createPizza(page, 1, "", "pescoVegetarian");
  const pescoFlag = page.getByTestId("pescoVegetarian-flag");
  const moveArea = page.getByTestId("fairness-parameter-move-area");
  const fairnessCursor1 = page.getByTestId("fairness-parameter-cursor1");
  const fairnessCursor2 = page.getByTestId("fairness-parameter-cursor2");
  const parametersButton = page.getByTestId("param-overlay-button");
  const parametersBackground = page.getByTestId("param-overlay-background");

  await expect(pescoFlag).toHaveText("Bad😖");

  await parametersButton.click();
  await setCursorTo(page, fairnessCursor2, moveArea, 200);
  await parametersBackground.click({ position: { x: 0, y: 0 } });
  await page.waitForTimeout(500); // Wait for animation to end
  await expect(pescoFlag).toHaveText("Okay😕");

  await parametersButton.click({ timeout: 10000 });
  await setCursorTo(page, fairnessCursor1, moveArea, 200);
  await parametersBackground.click({ position: { x: 0, y: 0 } });
  await expect(pescoFlag).toHaveText("Good😊");
});

async function setCursorTo(
  page: Page,
  cursor: Locator,
  moveArea: Locator,
  value: number
) {
  await page.waitForTimeout(500); //wait for animation to end before getting bounding box
  const bounds = await moveArea.boundingBox();
  const percentage = (value - 105) / 95;
  await cursor.hover();
  await page.mouse.down();
  await page.mouse.move(
    (bounds?.x ?? 0) + (bounds?.width ?? 1) * percentage,
    (bounds?.y ?? 0) - 20
  );
  await page.mouse.up();
}

async function clickOnValue(page: Page, moveArea: Locator, value: number) {
  const bounds = await moveArea.boundingBox();
  const percentage = (value - 105) / 95;
  await page.mouse.click(
    (bounds?.x ?? 0) + 1 + ((bounds?.width ?? 1) - 2) * percentage,
    (bounds?.y ?? 0) + (bounds?.height ?? 0) / 2
  );
}
