import { test, expect, Locator, Page } from "@playwright/test";
import { createPizza, diets, setPeople } from "./test-utils";

test("Suggester overlay can be opened an closed", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const overlayButton = page.getByTestId("suggester-button");
  const overlayContainer = page.getByTestId("suggester-overlay-container");
  const overlayBackground = page.getByTestId("suggester-overlay-background");
  await overlayButton.click();
  await expect(overlayContainer).toBeVisible();
  await overlayBackground.click({ position: { x: 0, y: 0 } });
  await expect(overlayContainer).not.toBeVisible();
});

test("User can change fairness from 105 to 200 with steps of 5", async ({
  page,
  browserName,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const fairnessSlider = page.getByTestId("suggester-fairness-slider");
  await setSliderTo(fairnessSlider, 105);
  await expect(fairnessSlider).toHaveValue("1.05");
  await page.keyboard.press("ArrowLeft");
  await expect(fairnessSlider).toHaveValue("1.05");
  await setSliderTo(fairnessSlider, 200);
  await expect(fairnessSlider).toHaveValue("2");
  await page.keyboard.press("ArrowRight");
  await expect(fairnessSlider).toHaveValue("2");
  if (browserName !== "webkit") {
    await page.keyboard.press("ArrowLeft");
    await expect(fairnessSlider).toHaveValue("1.95");
  }
});

test("User can select the strategy", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const strategyDropdown = page.getByTestId(
    "suggester-strategy-dropdown-button"
  );
  const strategyDropdownOption1 = page.getByTestId(
    "suggester-strategy-dropdown-maxDiversity-option"
  );
  const strategyDropdownOption2 = page.getByTestId(
    "suggester-strategy-dropdown-lowerCost-option"
  );
  const strategyLabel = page.getByTestId("suggester-strategy-label");
  await strategyDropdown.click();
  await expect(strategyDropdownOption1).toBeVisible();
  await strategyLabel.click();
  await expect(strategyDropdownOption1).not.toBeVisible();
  await strategyDropdown.click();
  await strategyDropdownOption1.click();
  await expect(strategyDropdown).toHaveText("Maximal diversity");
  await expect(strategyDropdownOption1).not.toBeVisible();
  await strategyDropdown.click();
  await strategyDropdownOption2.click();
  await expect(strategyDropdown).toHaveText("Minimal cost");
});

test("User can select the quantity", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const quantityDropdown = page.getByTestId(
    "suggester-quantity-dropdown-button"
  );
  const quantityDropdownOption1 = page.getByTestId(
    "suggester-quantity-dropdown-0.25-option"
  );
  const quantityDropdownOption2 = page.getByTestId(
    "suggester-quantity-dropdown-1-option"
  );
  const quantityDropdownOption3 = page.getByTestId(
    "suggester-quantity-dropdown-1.25-option"
  );
  const quantityLabel = page.getByTestId("suggester-quantity-label");

  //Open and close
  await quantityDropdown.click();
  await expect(quantityDropdownOption1).toBeVisible();
  await expect(quantityDropdownOption3).not.toBeVisible();
  await quantityLabel.click();
  await expect(quantityDropdownOption1).not.toBeVisible();

  //Select visible option
  await quantityDropdown.click();
  await quantityDropdownOption1.click();
  await expect(quantityDropdown).toHaveText("1/4");
  await expect(quantityDropdownOption1).not.toBeVisible();

  //Load more option and select one
  await quantityDropdown.click();
  await quantityDropdownOption2.scrollIntoViewIfNeeded();
  await quantityDropdownOption3.scrollIntoViewIfNeeded();
  await quantityDropdownOption3.click();
  await expect(quantityDropdown).toHaveText("1 + 1/4");
});

test("Computing with people that can't eat displays error message", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 1, 0, 0, 0);
  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  const errorMessage = page.getByTestId("suggester-error-message");
  await expect(errorMessage).toBeVisible();
});

test("Computing with minimal price selects only the lowest price pizzas", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  let i = 0;
  for (const diet of diets) {
    for (let j = 0; j < 2; j++) {
      await createPizza(page, 1, i.toString(), diet, (j + 12).toString());
      i++;
    }
  }
  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  await checkPresentPizza(page, [2, 4, 6]);
});

test("Computing with maximal diversity selects as much pizzas as possible", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  let i = 0;
  for (const diet of diets) {
    for (let j = 0; j < 2; j++) {
      await createPizza(page, 1, i.toString(), diet, (j + 12).toString());
      i++;
    }
  }

  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const strategyDropdown = page.getByTestId(
    "suggester-strategy-dropdown-button"
  );
  const strategyDropdownOption1 = page.getByTestId(
    "suggester-strategy-dropdown-maxDiversity-option"
  );
  await strategyDropdown.click();
  await strategyDropdownOption1.click();
  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  await checkPresentPizza(page, [2, 3, 6, 7]);
});

test("Computing respects quantity", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  let i = 0;
  for (const diet of diets) {
    for (let j = 0; j < 2; j++) {
      await createPizza(page, 1, i.toString(), diet, (j + 12).toString());
      i++;
    }
  }

  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();

  const quantityDropdown = page.getByTestId(
    "suggester-quantity-dropdown-button"
  );
  const quantityDropdownOption2 = page.getByTestId(
    "suggester-quantity-dropdown-1-option"
  );
  const quantityDropdownOption3 = page.getByTestId(
    "suggester-quantity-dropdown-1.5-option"
  );

  await quantityDropdown.click();
  await quantityDropdownOption2.scrollIntoViewIfNeeded();
  await quantityDropdownOption3.scrollIntoViewIfNeeded();
  await quantityDropdownOption3.click();

  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  const totalQuantity = await page
    .getByTestId("suggestion-total-quantity")
    .textContent({ timeout: 10000 });
  expect(Number(totalQuantity) >= 8 * 1.5).toBeTruthy();
});

test("The solution is satisfying", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  let i = 0;
  for (const diet of diets) {
    for (let j = 0; j < 2; j++) {
      await createPizza(page, 1, i.toString(), diet, (j + 12).toString());
      i++;
    }
  }

  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  const applyButton = page.getByTestId("suggester-apply-button");
  await applyButton.click({ timeout: 10000 });
  const overlayContainer = page.getByTestId("suggester-overlay-container");
  await expect(overlayContainer).not.toBeVisible();

  const normalText = await page.getByTestId("normal-flag").textContent();
  const pVText = await page.getByTestId("pescoVegetarian-flag").textContent();
  const vegetaText = await page.getByTestId("vegetarian-flag").textContent();
  const veganText = await page.getByTestId("vegan-flag").textContent();
  expect(goodOrPerfect(normalText)).toBeTruthy();
  expect(goodOrPerfect(pVText)).toBeTruthy();
  expect(goodOrPerfect(vegetaText)).toBeTruthy();
  expect(goodOrPerfect(veganText)).toBeTruthy();
});

test("The price in the suggestion is the same after applying", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  await setPeople(page, 2, 2, 2, 2);
  let i = 0;
  for (const diet of diets) {
    for (let j = 0; j < 2; j++) {
      await createPizza(page, 1, i.toString(), diet, (j + 12).toString());
      i++;
    }
  }

  const overlayButton = page.getByTestId("suggester-button");
  await overlayButton.click();
  const computeButton = page.getByTestId("suggester-compute-button");
  await computeButton.click();
  const price = await page
    .getByTestId("suggestion-total-price")
    .textContent({ timeout: 10000 });
  const applyButton = page.getByTestId("suggester-apply-button");
  await applyButton.click();
  const overlayContainer = page.getByTestId("suggester-overlay-container");
  await expect(overlayContainer).not.toBeVisible();
  const priceFlagTotal = await page
    .getByTestId("price-flag-total")
    .textContent();
  expect(price?.slice(-2) === priceFlagTotal?.slice(-7));
});

async function setSliderTo(slider: Locator, value: number) {
  const bounds = await slider.boundingBox();
  const percentage = (value - 105) / 95;
  await slider.click({
    position: {
      x: 1 + ((bounds?.width ?? 1) - 2) * percentage,
      y: (bounds?.height ?? 0) / 2,
    },
  });
}

async function checkPresentPizza(page: Page, pizzas: number[]) {
  for (const pizzaId of pizzas) {
    const pizza = page.getByTestId(`suggestion-line-${pizzaId}`);
    await expect(pizza).toBeVisible({ timeout: 10000 });
  }
}

function goodOrPerfect(string: string | null) {
  return string?.includes("Perfect") || string?.includes("Good");
}
