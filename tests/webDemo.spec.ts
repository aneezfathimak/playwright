import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true");
});
test("Edit Cell + Add Calculated Row + Download PDF", async ({ page, request }) => {
  await page.locator("#table-row-8_table-col-6 div").dblclick();
  await page.getByRole("textbox").fill("145827");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator("#table-row-8_table-col-6")).toContainText("145.83");
  await page.getByText("Insert").click();
  await page.getByRole("cell", { name: "Canada" }).nth(1).click();
  await page.locator("#insertRow").click();
  await page.getByRole("button", { name: "Calculated Row" }).click();
  await page.getByRole("textbox").nth(1).fill("SUM(34234,23423)");
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByRole("button", { name: "" }).click();
  await page.getByText("Design").click();
  await page
    .locator("div")
    .filter({ hasText: /^Column BreakNone$/ })
    .getByLabel("dropdown-arrow")
    .click();
  await page.locator("#header-container").getByRole("button", { name: "Year" }).click();
  await page.getByText("Export").click();
  await page.getByRole("button", { name: "PDF Report" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export.pdf" }).click();
  const download = await downloadPromise;
  await page.getByRole("button", { name: "Close" }).click();
});

test("Change Layout + Add QuickFormula + Apply Break + Export", async ({ page, request }) => {
  await expect(page.getByText("Home")).toBeVisible();
  await page.locator("#hierarchyOptions").click();
  await page.getByRole("button", { name: "Table" }).click();
  await page.getByText("Insert").click();
  await page.locator("#insertColumn").click();
  await page.getByRole("button", { name: "Overall Ranking" }).click();
  await page.getByText("Visual Column").click();
  await page.getByPlaceholder("Select a measure").click();
  await page.locator("#header-container").getByText("2018").click();
  await page.locator("div:nth-child(2) > .toolbar-label-container > div:nth-child(2) > .ms-Icon").click();
  await page.getByRole("button", { name: "PY", exact: true }).click();
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText("Design").click();
  await page
    .locator("div")
    .filter({ hasText: /^Column BreakNone$/ })
    .getByLabel("dropdown-arrow")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Column BreakNone$/ })
    .getByLabel("dropdown-arrow")
    .click();
  await page.getByText("Export").click();
  await page
    .locator("div")
    .filter({ hasText: /^ExportReportCopy toClipboardExport to Excel$/ })
    .getByLabel("dropdown-arrow")
    .click();
  await page.getByRole("button", { name: "Fully Expanded" }).click();
  const download1Promise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export.xlsx" }).click();
  const download1 = await download1Promise;
});
test("Applying Charts", async ({ page, request }) => {
  await page.getByRole("button", { name: "AC in Thousands" }).nth(2).click();
  await page.locator("#barChart-b").click();
  await page.getByLabel("external-icons customIconButtons bar-icon").click();
  await page.locator('[id="fill\\ pattern"]').click();
  await page.getByRole("button", { name: "Outlined" }).click();
});
