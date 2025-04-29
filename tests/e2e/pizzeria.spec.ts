import { test, expect } from "@playwright/test";
import { checkPizza, createPizza } from "./test-utils";

test("Overlays are visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const saveAsBackground = page.getByTestId("save-as-overlay-background");
  const manageOverlay = page.getByTestId("manage-overlay-container");
  const manageBackground = page.getByTestId("manage-overlay-background");

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
  const exitButton = page.getByTestId("pizza-panel-exit-button");
  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId("expand-pizza-de-la-mama");
  const manageLoad = page.getByTestId("manage-pizza-de-la-mama-load-button");
  const pizza0name = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-name"
  );
  const pizza0diet = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-vegetarian-diet-icon"
  );
  const pizza0price = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-price"
  );
  const pizzeriaNameHeader = page.getByTestId("pizza-panel-pizzeria-name");

  //Save
  await createPizza(page, 0, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();
  await expect(pizzeriaNameHeader).toHaveText("Pizza de la mama");

  //Empty pizza list
  await exitButton.click();
  await expect(page.getByTestId("0-pizza-display-name")).not.toBeVisible();
  await expect(pizzeriaNameHeader).not.toBeVisible();

  //Visible in load
  await manageButton.click();
  await expect(manageSelect).toBeVisible();
  await manageSelect.click();
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
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId("expand-pizza-de-la-mama");
  const pizza0name = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-name"
  );
  const pizza0diet = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-vegetarian-diet-icon"
  );
  const pizza0price = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-price"
  );

  //Save
  await createPizza(page, 0, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Reload page
  await page.reload();

  //Visible in load
  await manageButton.click();
  await expect(manageSelect).toBeVisible();
  await manageSelect.click();
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
  const exitButton = page.getByTestId("pizza-panel-exit-button");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId("expand-pizza-de-la-mama");
  const alreadyExists = page.getByTestId("save-as-conflict-already-exists");
  const contentOf = page.getByTestId("save-as-conflict-content-of");
  const pizza1name = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-1-name"
  );

  //Save
  await createPizza(page, 0, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();
  await exitButton.click();

  //Change pizzeria but cancel
  await createPizza(page, 0, 1, "4 Cheese", "vegetarian", "14.02");
  await createPizza(page, 1, 1, "Bourguignonne", "normal", "15.80");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(alreadyExists).toBeVisible();
  await expect(contentOf).toBeVisible();
  await saveAsConflictCancel.click();
  await expect(alreadyExists).not.toBeVisible();
  await expect(contentOf).not.toBeVisible();
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
  await expect(alreadyExists).toBeVisible();
  await expect(contentOf).toBeVisible();
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
  const alreadyExists = page.getByTestId("save-as-conflict-already-exists");
  const exitButton = page.getByTestId("pizza-panel-exit-button");

  //Save
  await createPizza(page, 0, 1, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await expect(saveAsOverlay).not.toBeVisible();
  await exitButton.click();

  //Change pizzeria
  await saveAsButton.click();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await expect(alreadyExists).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(alreadyExists).not.toBeVisible();
  await page.keyboard.type("Pizza de la mama");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(saveAsOverlay).not.toBeVisible();
});

test("User can't edit current pizzeria directly", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const pizza0 = page.getByTestId("0-pizza-display");
  const pizza0Name = page.getByTestId("0-pizza-display-name");
  const pizza0EditName = page.getByTestId("0-pizza-edit-name");
  const pizzaEditButton = page.getByTestId("0-pizza-display-edit-button");
  const pizzaDeleteButton = page.getByTestId("0-pizza-display-delete-button");
  const pizzaQuantityDeleteButton = page.getByTestId(
    "0-pizza-display-quantity-delete"
  );

  //Save
  await createPizza(page, 0, 0, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Edit must not be possible
  await pizza0.hover();
  await expect(pizzaEditButton).not.toBeVisible();
  await expect(pizzaDeleteButton).not.toBeVisible();
  await expect(pizzaQuantityDeleteButton).not.toBeVisible();
  await pizza0Name.dblclick();
  await expect(pizza0Name).toBeVisible();
  await expect(pizza0EditName).not.toBeVisible();
});

test("User can edit pizzeria and cancel", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const editButton = page.getByTestId("pizza-panel-edit-button");
  const cancelButton = page.getByTestId("pizza-panel-cancel-button");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const pizza0 = page.getByTestId("0-pizza-display");
  const pizza0Name = page.getByTestId("0-pizza-display-name");
  const pizza0EditName = page.getByTestId("0-pizza-edit-name");
  const pizzaEditButton = page.getByTestId("0-pizza-display-edit-button");
  const pizzaDeleteButton = page.getByTestId("0-pizza-display-delete-button");
  const pizzaQuantityDeleteButton = page.getByTestId(
    "0-pizza-display-quantity-delete"
  );
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId("expand-pizza-de-la-mama");
  const pizza0name = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-name"
  );

  //Save
  await createPizza(page, 0, 0, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Edit
  await editButton.click();
  await pizza0.hover();
  await expect(pizzaEditButton).toBeVisible();
  await expect(pizzaDeleteButton).toBeVisible();
  await expect(pizzaQuantityDeleteButton).toBeVisible();
  await pizza0Name.dblclick();
  await expect(pizza0Name).not.toBeVisible();
  await expect(pizza0EditName).toBeVisible();
  await pizza0EditName.fill("Chèvre Miel");
  await page.keyboard.press("Enter");

  //Cancel
  await cancelButton.click();
  await expect(pizza0Name).toContainText("4 Cheese");

  //Have not changed
  await manageButton.click();
  await manageSelect.click();
  await expect(pizza0name).toContainText("4 Cheese");
});

test("User can edit pizzeria and validate", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const editButton = page.getByTestId("pizza-panel-edit-button");
  const saveButton = page.getByTestId("pizza-panel-save-button");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const pizza0Name = page.getByTestId("0-pizza-display-name");
  const pizza0EditName = page.getByTestId("0-pizza-edit-name");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const manageSelect = page.getByTestId("expand-pizza-de-la-mama");
  const pizza0name = page.getByTestId(
    "pizza-de-la-mama-displayer-pizza-0-name"
  );

  //Save
  await createPizza(page, 0, 0, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Edit
  await editButton.click();
  await pizza0Name.dblclick();
  await pizza0EditName.fill("Chèvre Miel");
  await page.keyboard.press("Enter");

  //Validate
  await saveButton.click();
  await expect(pizza0Name).toContainText("Chèvre Miel");

  //Have not changed
  await manageButton.click();
  await manageSelect.click();
  await expect(pizza0name).toContainText("Chèvre Miel");
});

test("User can load another pizzeria while editing and it cancels change", async ({
  page,
}) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const saveAsButton = page.getByTestId("pizza-panel-save-as-button");
  const editButton = page.getByTestId("pizza-panel-edit-button");
  const exitButton = page.getByTestId("pizza-panel-exit-button");

  const saveAsInput = page.getByTestId("save-as-pizzeria-text-input");
  const saveAsInputButton = page.getByTestId("save-as-pizzeria-save-button");
  const saveAsOverlay = page.getByTestId("save-as-overlay-container");
  const pizza0Name = page.getByTestId("0-pizza-display-name");
  const pizza0EditName = page.getByTestId("0-pizza-edit-name");
  const manageButton = page.getByTestId("pizza-panel-manage-button");
  const mamaLoad = page.getByTestId("manage-pizza-de-la-mama-load-button");
  const zozanSelect = page.getByTestId("expand-zozan-pizza");
  const pizza0name = page.getByTestId("zozan-pizza-displayer-pizza-0-name");
  const manageOverlay = page.getByTestId("manage-overlay-container");

  //Save
  await createPizza(page, 0, 0, "4 Cheese", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Pizza de la mama");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();
  await exitButton.click();

  //Save
  await createPizza(page, 0, 0, "Chèvre Miel", "vegetarian", "14.02");
  await saveAsButton.click();
  await saveAsInput.fill("Zozan Pizza");
  await saveAsInputButton.click();
  await expect(saveAsOverlay).not.toBeVisible();

  //Edit
  await editButton.click();
  await pizza0Name.dblclick();
  await pizza0EditName.fill("Saumon");
  await page.keyboard.press("Enter");

  //Load another pizzeria
  await manageButton.click();
  await mamaLoad.click();
  await expect(manageOverlay).not.toBeVisible();

  //Have not changed
  await manageButton.click();
  await zozanSelect.click();
  await expect(pizza0name).toContainText("Chèvre Miel");
});
