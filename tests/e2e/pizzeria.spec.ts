import { test, expect } from "@playwright/test";
import { checkPizza, createPizza } from "./test-utils";

test("Overlays are visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveButton = page.getByTestId("pizza-panel-save-button");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const saveAsBackground = page.getByTestId("save-as-overlay-background");
  const manageOverlay = page.getByTestId("manage-overlay-container");
  const manageBackground = page.getByTestId("manage-overlay-background");

  //Check that both save button opens the overlay
  await saveButton.click();
  await expect(saveAsOverlay).toBeVisible();
  await saveAsBackground.click({ position: { x: 0, y: 0 } });
  await expect(saveAsOverlay).not.toBeVisible();
  await saveAsButton.click();
  await expect(saveAsOverlay).toBeVisible();
  await saveAsBackground.click({ position: { x: 0, y: 0 } });
  await expect(saveAsOverlay).not.toBeVisible();

  await manageButton.click();
  await expect(manageOverlay).toBeVisible();
  await manageBackground.click({ position: { x: 0, y: 0 } });
  await expect(manageOverlay).not.toBeVisible();
});

test("User can save and load pizzeria", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const manageOverlay = page.getByTestId("manage-overlay-container");
  const newButton = page.getByTestId("pizza-panel-new-pizzeria-button");
  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId(
    "manage-pizza-de-la-mama-select-button"
  );
  const manageLoad = page.getByTestId("manage-pizza-de-la-mama-load-button");
  const pizzeriaName = page.getByTestId("pizzeria-displayer-name");
  const pizza0name = page.getByTestId("pizzeria-displayer-pizza-0-name");
  const pizza0diet = page.getByTestId(
    "pizzeria-displayer-pizza-0-vegetarian-diet-icon"
  );
  const pizza0price = page.getByTestId("pizzeria-displayer-pizza-0-price");
  const pizzeriaNameHeader = page.getByTestId("pizza-panel-pizzeria-name");

  //Save
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();
  await expect(pizzeriaNameHeader).toHaveText("Pizza de la mama");

  //Empty pizza list
  await newButton.click();
  await expect(page.getByTestId("0-pizza-display-name")).not.toBeVisible();
  await expect(pizzeriaNameHeader).not.toBeVisible();

  //Visible in load
  await manageButton.click();
  await expect(manageSelect).toBeVisible();
  await manageSelect.click();
  await expect(pizzeriaName).toHaveText("Pizza de la mama");
  await expect(pizza0name).toHaveText("4 Cheese");
  await expect(pizza0diet).toBeVisible();
  await expect(pizza0price).toHaveText("14.02 €");

  //Loadable
  await manageLoad.click();
  await expect(manageOverlay).not.toBeVisible();
  await checkPizza(page, 0, 0, "4 Cheese", "vegetarian", "14.02");
  await expect(pizzeriaNameHeader).toHaveText("Pizza de la mama");
});

test("Pizzerias are persisted", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveButton = page.getByTestId("pizza-panel-save-button");
  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId(
    "manage-pizza-de-la-mama-select-button"
  );
  const pizzeriaName = page.getByTestId("pizzeria-displayer-name");
  const pizza0name = page.getByTestId("pizzeria-displayer-pizza-0-name");
  const pizza0diet = page.getByTestId(
    "pizzeria-displayer-pizza-0-vegetarian-diet-icon"
  );
  const pizza0price = page.getByTestId("pizzeria-displayer-pizza-0-price");

  //Save
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  await saveButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Reload page
  await page.reload();

  //Visible in load
  await manageButton.click();
  await expect(manageSelect).toBeVisible();
  await manageSelect.click();
  await expect(pizzeriaName).toHaveText("Pizza de la mama");
  await expect(pizza0name).toHaveText("4 Cheese");
  await expect(pizza0diet).toBeVisible();
  await expect(pizza0price).toHaveText("14.02 €");
});

test("Pizzerias can have name conflict and be overriden", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const saveAsBackground = page.getByTestId("save-as-overlay-background");
  const manageBackground = page.getByTestId("manage-overlay-background");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsConflictCancel = page.getByTestId("save-as-conflict-cancel");
  const saveAsConflictOverride = page.getByTestId("save-as-conflict-override");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId(
    "manage-pizza-de-la-mama-select-button"
  );
  const pizzeriaName = page.getByTestId("pizzeria-displayer-name");
  const pizza1name = page.getByTestId("pizzeria-displayer-pizza-1-name");

  //Save
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Change pizzeria but cancel
  await createPizza(page, 1, "Bourguignonne", "normal", "15.80");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(pizzeriaName).toBeVisible();
  await saveAsConflictCancel.click();
  await expect(pizzeriaName).not.toBeVisible();
  await saveAsBackground.click({ position: { x: 0, y: 0 } });

  //Check pizzeria didn't change
  await manageButton.click();
  await manageSelect.click();
  await expect(pizza1name).not.toBeVisible();
  await manageBackground.click({ position: { x: 0, y: 0 } });

  //Change pizzeria and override
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(pizzeriaName).toBeVisible();
  await saveAsConflictOverride.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Check pizzeria did change
  await manageButton.click();
  await manageSelect.click();
  await expect(pizza1name).toBeVisible();
  await manageBackground.click({ position: { x: 0, y: 0 } });
});

test("Save pizzeria can be done with keyboard", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const pizzeriaName = page.getByTestId("pizzeria-displayer-name");

  //Save
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await expect(saveAsOverlay).not.toBeVisible();

  //Change pizzeria
  await saveAsButton.click();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await expect(pizzeriaName).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(pizzeriaName).not.toBeVisible();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(saveAsOverlay).not.toBeVisible();
});

test("User can save current pizzeria", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const saveButton = page.getByTestId("pizza-panel-save-button");
  const manageBackground = page.getByTestId("manage-overlay-background");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId(
    "manage-pizza-de-la-mama-select-button"
  );
  const pizza1name = page.getByTestId("pizzeria-displayer-pizza-1-name");

  //Save
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Change pizzeria
  await createPizza(page, 1, "Bourguignonne", "normal", "15.80");
  await saveButton.click();

  //Check pizzeria changed
  await manageButton.click();
  await manageSelect.click();
  await expect(pizza1name).toBeVisible();
  await manageBackground.click({ position: { x: 0, y: 0 } });
});
