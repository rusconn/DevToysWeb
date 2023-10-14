import { expect, Page, test } from "@playwright/test";

function navExpandedButton(page: Page) {
  const nav = page.getByRole("navigation");
  return nav.getByRole("button", { expanded: true });
}

test.describe("initial open/close states of accordion", () => {
  test("closed when go to /", async ({ page }) => {
    const button = navExpandedButton(page);

    await page.goto("/");
    await expect(button).not.toBeVisible();
  });

  test("closed when go to group pages", async ({ page }) => {
    const button = navExpandedButton(page);

    await page.goto("/converters");
    await expect(button).not.toBeVisible();

    await page.goto("/formatters");
    await expect(button).not.toBeVisible();
  });

  test("opened when go to tool pages", async ({ page }) => {
    const button = navExpandedButton(page);

    await page.goto("/converters/number-base");
    await expect(button).toBeVisible();

    await page.goto("/formatters/json");
    await expect(button).toBeVisible();
  });
});
