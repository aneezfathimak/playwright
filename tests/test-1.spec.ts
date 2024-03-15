import { test, expect } from "@playwright/test";
require("dotenv").config();
const password = process.env.PASSWORD ?? "default_password";

test("test", async ({ page, request }) => {
  await page.goto("https://app.powerbi.com/groups/16578ee2-acf8-4611-863a-02e5168c2883/reports/825c44dd-450f-4465-8a52-d6106092c516/ReportSection80bbe140a4d9895d383b?experience=power-bi");
  await page.goto(
    "https://app.powerbi.com/singleSignOn?experience=power-bi&ru=https%3A%2F%2Fapp.powerbi.com%2Fgroups%2F16578ee2-acf8-4611-863a-02e5168c2883%2Freports%2F825c44dd-450f-4465-8a52-d6106092c516%2FReportSection80bbe140a4d9895d383b%3Fexperience%3Dpower-bi%26noSignUpCheck%3D1"
  );
  await page.getByPlaceholder("Enter email").click();
  await page.getByPlaceholder("Enter email").fill("aneezfathimak@lumel.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByTestId("appbar-edit-menu-btn").click();
  await page.getByText("Venkatesh").click(); //Page switching
  await page.getByText("Aneez", { exact: true }).click();
  await page.frameLocator('iframe[name="visual-sandbox"]').getByText("Insert").click();
  await page.frameLocator('iframe[name="visual-sandbox"]').getByRole("cell", { name: "Vancouver" }).nth(1).click();
  await page.frameLocator('iframe[name="visual-sandbox"]').locator("#insertRow").click();
  await page.frameLocator('iframe[name="visual-sandbox"]').getByRole("button", { name: "Calculated Row" }).click();
  await page.frameLocator('iframe[name="visual-sandbox"]').locator(".CodeMirror-scroll").click();
  await page.frameLocator('iframe[name="visual-sandbox"]').getByRole("textbox").nth(1).fill("SUM(232423,2342343)");
  await page.frameLocator('iframe[name="visual-sandbox"]').getByRole("button", { name: "Create" }).click();
});
