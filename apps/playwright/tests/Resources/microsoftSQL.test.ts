import { test } from "@playwright/test"

test.describe("MicrosoftSQL create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("MicrosoftSqlIconMicrosoft SQL").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByPlaceholder("Hostname").click()
    await page.getByPlaceholder("Hostname").fill(process.env.ILLA_MSSQL_HOST)
    await page.getByPlaceholder("1433").click()
    await page.getByPlaceholder("1433").fill(process.env.ILLA_MSSQL_PORT)
    await page.getByPlaceholder("Password").click()
    await page
      .getByPlaceholder("Password")
      .fill(process.env.ILLA_MSSQL_PASSWORD)
    await page.getByPlaceholder("Username").click()
    await page
      .getByPlaceholder("Username")
      .fill(process.env.ILLA_MSSQL_USERNAME)
    await page.getByPlaceholder("Database name").click()
    await page
      .getByPlaceholder("Database name")
      .fill(process.env.ILLA_MSSQL_DATABASENAME)
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
