import test, { expect } from "@playwright/test";
import { defaultURLLight } from "../test-utils";

test("Info overlay can be opened and closed", async ({ page, isMobile }) => {
  test.skip(isMobile === true, "No overlay");
  await page.goto(process.env.BASE_URL ?? defaultURLLight);
  const infoButton = page.getByTestId("light-about-button");
  await infoButton.click();
  const overlayBackground = page.getByTestId("light-about-background");
  const overlayContainer = page.getByTestId("light-about-container");
  await expect(overlayContainer).toBeVisible();
  await overlayBackground.click({ position: { x: 0, y: 0 } });
  await expect(overlayContainer).not.toBeVisible();
});
