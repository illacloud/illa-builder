import { test } from "@playwright/test"

test.describe("OracleDB create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("OracleDBIconOracle DB").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByPlaceholder("Hostname").click()
    await page.getByPlaceholder("Hostname").fill(process.env.ILLA_ORACLE_HOST)
    await page.getByPlaceholder("1521").click()
    await page.getByPlaceholder("1521").fill(process.env.ILLA_ORACLE_PORT)
    await page.locator("label").filter({ hasText: "SID" }).click()
    await page.getByPlaceholder("oracle").click()
    await page.getByPlaceholder("oracle").fill(process.env.ILLA_ORACLE_USERNAME)
    await page.getByPlaceholder("••••••••").click()
    await page
      .getByPlaceholder("••••••••")
      .fill(process.env.ILLA_ORACLE_PASSWORD)
    await page.getByPlaceholder("default").click()
    await page.getByPlaceholder("default").fill(process.env.ILLA_ORACLE_NAME)
    await page
      .locator("div")
      .filter({ hasText: /^Use SSL when available$/ })
      .getByRole("button")
      .click()
    await page.getByRole("button", { name: "Test Connection" }).click()
    await page.getByText("SuccessCircleIconTest successfully").click()
    await page.getByRole("button", { name: "Save Resource" }).click()
    await page.getByText("SuccessCircleIconSave successfully").click()
  })

  test.afterEach("Close Modal", async ({ page }) => {
    await page.getByRole("button", { name: "MoreIcon" }).first().click()
    await page.getByText("Delete").click()
    await page.getByRole("button", { name: "Delete" }).click()
    await page.getByText("SuccessCircleIconDeleted successfully").click()
  })
})
