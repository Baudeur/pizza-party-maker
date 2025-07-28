import { test, expect } from "@playwright/test";
import { defaultURL, scrollToBottom, setPeople } from "../test-utils";

test("Graphs are visible", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const graphExpand = page.getByTestId("graph-expand");
  await graphExpand.click();
  const peopleGraph = page.getByTestId("people-graph");
  const pizzaGraph = page.getByTestId("pizza-graph");
  const peopleGraphContainer = page.getByTestId("people-graph-container");
  const pizzaGraphContainer = page.getByTestId("pizza-graph-container");
  await expect(peopleGraph).toBeVisible();
  await expect(pizzaGraph).toBeVisible();
  await expect(peopleGraphContainer).toContainText("People");
  await expect(pizzaGraphContainer).toContainText("Pizza");
});

test("Display N/A if empty", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const graphExpand = page.getByTestId("graph-expand");
  await graphExpand.click();
  const peopleGraph = page.getByTestId("people-graph");
  await expect(peopleGraph).toHaveScreenshot("graph-N-A.png");
});

test("Display all people in proportions", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const graphExpand = page.getByTestId("graph-expand");
  await graphExpand.click();
  await setPeople(page, 1, 3, 4, 2);
  await scrollToBottom(page);
  const peopleGraph = page.getByTestId("people-graph");
  await expect(peopleGraph).toHaveScreenshot("graph-all.png");
});

test("Don't display missing people", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const graphExpand = page.getByTestId("graph-expand");
  await graphExpand.click();
  await setPeople(page, 2, 0, 5, 0);
  await scrollToBottom(page);
  const peopleGraph = page.getByTestId("people-graph");
  await expect(peopleGraph).toHaveScreenshot("graph-missing.png");
});

test("Don't display icon if too small", async ({ page }) => {
  await page.goto(process.env.BASE_URL ?? defaultURL);
  const graphExpand = page.getByTestId("graph-expand");
  await graphExpand.click();
  await setPeople(page, 1, 3, 5, 5);
  await scrollToBottom(page);
  const peopleGraph = page.getByTestId("people-graph");
  await expect(peopleGraph).toHaveScreenshot("graph-no-icon.png");
});
