import { expect, test } from "@playwright/test";

// avoid VRT on CI because of difference between CI and local test env
// we can do VRT on CI if dockerize local test env
if (!process.env.CI) {
  test("VRT", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot();
  });
}
