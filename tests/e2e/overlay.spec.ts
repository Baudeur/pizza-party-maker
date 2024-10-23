import test, { expect } from "@playwright/test";

test("Info overlay can be opened and closed", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const infoButton = page.getByTestId("info-overlay-button");
  await infoButton.click();
  const overlayBackground = page.getByTestId("info-overlay-background");
  const overlayContainer = page.getByTestId("info-overlay-container");
  await expect(overlayContainer).toBeVisible();
  await overlayBackground.click({ position: { x: 0, y: 0 } });
  await expect(overlayContainer).not.toBeVisible();
});

test("Details overlay can be opened and closed", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? "localhost:5173");
  const detailsExpand = page.getByTestId("details-expand");
  await detailsExpand.click();
  const detailsButton = page.getByTestId("details-overlay-button");
  await detailsButton.click();
  const overlayBackground = page.getByTestId("details-overlay-background");
  const overlayContainer = page.getByTestId("details-overlay-container");
  await expect(overlayContainer).toBeVisible();
  await overlayBackground.click({ position: { x: 0, y: 0 } });
  await expect(overlayContainer).not.toBeVisible();
});
