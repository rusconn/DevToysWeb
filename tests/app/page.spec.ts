import { expect, test } from "@playwright/test";

test("VRT", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot();
});
