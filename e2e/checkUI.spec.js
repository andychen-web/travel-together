// 開啟GUI  npx playwright test --ui
import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "ScenicSpot",
  // "ScenicSpot/:id",
  "Activity",
  // "Activity/:id",
  "Restaurant",
  // "Restaurant/:id",
  "Articles",
  // "Articles/:id",
  "Admin/Auth",
  "Admin/Articles",
];
const productionBaseUrl = "";
const devBaseUrl = "http://127.0.0.1:3000";
test(`check UI `, async ({ page }) => {
  for (const path of routes) {
    await page.goto(`${devBaseUrl}/${path}`);
  }
});
