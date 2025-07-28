import test, { BrowserContext, expect, Page } from "@playwright/test";
import { defaultURLLight, setLightPeople, sliceToNumber } from "../test-utils";

test("Warning pop-ups show until you ask them not to show again", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const compute = page.getByTestId("light-compute-button");
  const moreButton = page.getByTestId(
    "light-suggestion-display-more-button-normal"
  );
  const input = page.getByTestId("light-suggestion-display-input-normal-input");
  const editButton = page.getByTestId("light-edit-button");
  const warningOverlay = page.getByTestId("light-warning-overlay-container");
  const warningOverlayBack = page.getByTestId(
    "light-warning-overlay-background"
  );
  const overlayConfirmButton = page.getByTestId("light-warning-confirm-button");
  const overlayCancelButton = page.getByTestId("light-warning-cancel-button");
  const overlayCheckBox = page.getByTestId("light-warning-checkbox");
  const spinner = page.getByTestId("light-suggestion-spinner");
  const quantity = page.getByTestId("light-suggestion-display-quantity-normal");
  const restartButton = page.getByTestId("light-restart-button");

  await setLightPeople(page, 4, 3, 1, 2);
  await compute.click();

  // #### More button ####

  // Warning confirm

  let startQuantity = Number(await quantity.textContent());

  await moreButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayConfirmButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(spinner).not.toBeVisible({ timeout: 15000 });

  let endQuantity = Number(await quantity.textContent());

  expect(endQuantity).toBeGreaterThan(startQuantity);

  // Warning cancel

  await moreButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayCancelButton.click();
  await expect(warningOverlay).not.toBeVisible();

  // Warning check don't show again

  await moreButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayCheckBox.click();
  await warningOverlayBack.click({ position: { x: 0, y: 50 } });

  // No pup up showing

  startQuantity = Number(await quantity.textContent());

  await moreButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(spinner).not.toBeVisible({ timeout: 15000 });

  endQuantity = Number(await quantity.textContent());

  expect(endQuantity).toBeGreaterThan(startQuantity);

  // Even after reload

  await page.reload();
  await compute.click();

  startQuantity = Number(await quantity.textContent());

  await moreButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(spinner).not.toBeVisible({ timeout: 15000 });

  endQuantity = Number(await quantity.textContent());

  expect(endQuantity).toBeGreaterThan(startQuantity);

  // #### Edit button ####

  // Warning cancel
  await editButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayCancelButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(input).not.toBeVisible();

  // Warning confirm

  await editButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayConfirmButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(input).toBeVisible();

  // Warning check don't show again

  await restartButton.click();
  await compute.click();

  await editButton.click();
  await expect(warningOverlay).toBeVisible();
  await overlayCheckBox.click();
  await warningOverlayBack.click({ position: { x: 0, y: 50 } });

  // No pup up showing

  await editButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(input).toBeVisible();

  // Even after reload

  await page.reload();
  await compute.click();
  await editButton.click();
  await expect(warningOverlay).not.toBeVisible();
  await expect(input).toBeVisible();
});

test.describe("No popup tests", () => {
  test.use({
    storageState: {
      cookies: [],
      origins: [
        {
          origin: defaultURLLight,
          localStorage: [
            {
              name: "parameters",
              value:
                '{"version":2,"slices":8,"thresholds":{"okay":125,"bad":150},"neverShowAgain":{"modifyWarning":true,"plusWarning":true}}',
            },
          ],
        },
      ],
    },
  });

  test("Editing manually changes the interface", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const editButton = page.getByTestId("light-edit-button");
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const inputNormal = page.getByTestId(
      "light-suggestion-display-input-normal-input"
    );
    const inputPescoVegetarian = page.getByTestId(
      "light-suggestion-display-input-pescoVegetarian-input"
    );
    const inputVegetarian = page.getByTestId(
      "light-suggestion-display-input-vegetarian-input"
    );
    const inputVegan = page.getByTestId(
      "light-suggestion-display-input-vegan-input"
    );
    const compute = page.getByTestId("light-compute-button");
    const quantityFlag = page.getByTestId("light-quantity-flag");

    await setLightPeople(page, 4, 3, 1, 2);
    await compute.click();

    await editButton.click();
    await expect(moreButtonNormal).not.toBeVisible();
    await expect(editButton).not.toBeVisible();
    await expect(inputNormal).toBeVisible();
    await expect(inputPescoVegetarian).toBeVisible();
    await expect(inputVegetarian).toBeVisible();
    await expect(inputVegan).toBeVisible();
    await expect(quantityFlag).toBeVisible();
  });

  test("Manual edits changes fairness indicators", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const editButton = page.getByTestId("light-edit-button");
    const inputPlusNormal = page.getByTestId(
      "light-suggestion-display-input-normal-plus"
    );
    const compute = page.getByTestId("light-compute-button");
    const normalFairness = page.getByTestId("light-pizza-flag-normal");
    const pescoVegetarianFairness = page.getByTestId(
      "light-pizza-flag-pescoVegetarian"
    );
    const vegetarianFairness = page.getByTestId("light-pizza-flag-vegetarian");
    const veganFairness = page.getByTestId("light-pizza-flag-vegan");

    await setLightPeople(page, 4, 3, 1, 2);
    await compute.click();

    const startValues = [
      await sliceToNumber(normalFairness),
      await sliceToNumber(pescoVegetarianFairness),
      await sliceToNumber(vegetarianFairness),
      await sliceToNumber(veganFairness),
    ];

    await editButton.click();
    await inputPlusNormal.click();
    await inputPlusNormal.click();

    const endValues = [
      await sliceToNumber(normalFairness),
      await sliceToNumber(pescoVegetarianFairness),
      await sliceToNumber(vegetarianFairness),
      await sliceToNumber(veganFairness),
    ];
    startValues.forEach((value, index) => {
      expect(value).not.toEqual(endValues[index]);
    });
  });

  test("Manual edits changes quantity indicators", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const editButton = page.getByTestId("light-edit-button");
    const inputPlusNormal = page.getByTestId(
      "light-suggestion-display-input-normal-plus"
    );
    const inputMinusVegan = page.getByTestId(
      "light-suggestion-display-input-vegan-minus"
    );
    const compute = page.getByTestId("light-compute-button");
    const quantityFlag = page.getByTestId("light-quantity-flag");

    await setLightPeople(page, 4, 3, 1, 2);
    await compute.click();

    await editButton.click();
    for (let i = 0; i < 3; i++) {
      await inputPlusNormal.click();
    }
    await expect(quantityFlag).toContainText("There are 3 extra pizzas");

    for (let i = 0; i < 3; i++) {
      await inputMinusVegan.click();
    }
    await expect(quantityFlag).toContainText("Perfect");
    await inputMinusVegan.click();
    await expect(quantityFlag).toContainText("Missing 1 pizza");
  });

  test("More increase the pizza", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const suggestionNormal = page.getByTestId(
      "light-suggestion-display-quantity-normal"
    );
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");

    await setLightPeople(page, 4, 3, 1, 2);
    await compute.click();

    const startQuantity = Number(await suggestionNormal.textContent());
    await moreButtonNormal.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });
    const endQuantity = Number(await suggestionNormal.textContent());
    expect(endQuantity).toBeGreaterThan(startQuantity);
  });

  test("More disappears if maxed", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const suggestionNormal = page.getByTestId(
      "light-suggestion-display-quantity-normal"
    );
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");

    await setLightPeople(page, 4, 3, 1, 2);
    await compute.click();

    const startQuantity = Number(await suggestionNormal.textContent());
    for (let i = 0; i < 4 - startQuantity; i++) {
      await moreButtonNormal.click();
      await expect(spinner).not.toBeVisible({ timeout: 15000 });
    }

    await expect(moreButtonNormal).not.toBeVisible();
  });

  test("More keeps other missing diet to at least their value", async ({
    page,
  }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const suggestionPescoVegetarian = page.getByTestId(
      "light-suggestion-display-quantity-pescoVegetarian"
    );
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");

    await setLightPeople(page, 4, 3, 1, 4);
    await compute.click();

    const startQuantity = Number(await suggestionPescoVegetarian.textContent());
    await moreButtonNormal.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });
    const endQuantity = Number(await suggestionPescoVegetarian.textContent());

    expect(endQuantity).toBeGreaterThanOrEqual(startQuantity);
  });

  test("If more is used more fair is visible", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const moreFairButton = page.getByTestId("light-more-fair-button");
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");

    await setLightPeople(page, 4, 3, 1, 4);
    await compute.click();

    await moreButtonNormal.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });

    await expect(moreFairButton).not.toBeDisabled();
  });

  test("More fair changes the suggestion", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const moreFairButton = page.getByTestId("light-more-fair-button");
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");
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
    await setLightPeople(page, 4, 3, 1, 4);
    await compute.click();

    await moreButtonNormal.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });

    const startSuggestion = [
      Number(await suggestionNormal.textContent()),
      Number(await suggestionPescoVegetarian.textContent()),
      Number(await suggestionVegeterian.textContent()),
      Number(await suggestionVegan.textContent()),
    ];

    await moreFairButton.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });

    const endSuggestion = [
      Number(await suggestionNormal.textContent()),
      Number(await suggestionPescoVegetarian.textContent()),
      Number(await suggestionVegeterian.textContent()),
      Number(await suggestionVegan.textContent()),
    ];

    expect(
      startSuggestion.some((value, index) => value !== endSuggestion[index])
    ).toBeTruthy();
  });

  test("More and more fair keeps quantity", async ({ page }) => {
    await page.goto(process.env.BASE_URL ?? defaultURLLight);
    const compute = page.getByTestId("light-compute-button");
    const moreFairButton = page.getByTestId("light-more-fair-button");
    const moreButtonNormal = page.getByTestId(
      "light-suggestion-display-more-button-normal"
    );
    const spinner = page.getByTestId("light-suggestion-spinner");
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
    await setLightPeople(page, 4, 3, 1, 4);
    await compute.click();

    const startSuggestion = [
      Number(await suggestionNormal.textContent()),
      Number(await suggestionPescoVegetarian.textContent()),
      Number(await suggestionVegeterian.textContent()),
      Number(await suggestionVegan.textContent()),
    ];

    await moreButtonNormal.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });

    const middle = [
      Number(await suggestionNormal.textContent()),
      Number(await suggestionPescoVegetarian.textContent()),
      Number(await suggestionVegeterian.textContent()),
      Number(await suggestionVegan.textContent()),
    ];

    await moreFairButton.click();
    await expect(spinner).not.toBeVisible({ timeout: 15000 });

    const endSuggestion = [
      Number(await suggestionNormal.textContent()),
      Number(await suggestionPescoVegetarian.textContent()),
      Number(await suggestionVegeterian.textContent()),
      Number(await suggestionVegan.textContent()),
    ];

    const startQuantity = startSuggestion.reduce((acc, curr) => acc + curr, 0);
    const middleQuantity = middle.reduce((acc, curr) => acc + curr, 0);
    const endQuantity = endSuggestion.reduce((acc, curr) => acc + curr, 0);
    expect(startQuantity).toEqual(middleQuantity);
    expect(middleQuantity).toEqual(endQuantity);
  });
});
