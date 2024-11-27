import { test, expect } from "@playwright/test";
import { createPizza } from "./test-utils";

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
  await createPizza(page, 1, "4 Cheese", "vegetarian", "14.02");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId(
    "manage-Pizza de la mama-select-button"
  );
  const pizzeriaName = page.getByTestId("pizzeria-displayer-name");
  const pizza0name = page.getByTestId("pizzeria-displayer-pizza-0-name");
  const pizza0diet = page.getByTestId(
    "pizzeria-displayer-pizza-0-vegetarian-diet-icon"
  );
  const pizza0price = page.getByTestId("pizzeria-displayer-pizza-0-price");

  //Save
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Visible in load
  await manageButton.click();
  await expect(manageSelect).toBeVisible();
  await manageSelect.click();
  await expect(pizzeriaName).toHaveText("Pizza de la mama");
  await expect(pizza0name).toHaveText("4 Cheese");
  await expect(pizza0diet).toBeVisible();
  await expect(pizza0price).toHaveText("14.02 €");

  //Loadable
});

//Pizzeria are persisted
//Keyboard control save
//New pizzeria
//Save current
//Load pizzeria
//Keyboard control load (to implement too)
