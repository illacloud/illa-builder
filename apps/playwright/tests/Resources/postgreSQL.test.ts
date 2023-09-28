import { test } from "@playwright/test"

test.describe("PostgreSQL create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("PostgreSqlIconPostgreSQL").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test12345")
    await page
      .getByPlaceholder("Hostname")
      .fill(process.env.ILLA_POSTGRESQL_HOST!)
    await page.getByPlaceholder("5432").fill(process.env.ILLA_POSTGRESQL_PORT)
    await page
      .getByPlaceholder("acme_production")
      .fill(process.env.ILLA_POSTGRESQL_DATABASENAME)
    await page
      .getByPlaceholder("Username")
      .fill(process.env.ILLA_POSTGRESQL_DATABASEUSERNAME)
    await page
      .getByPlaceholder("Password")
      .fill(process.env.ILLA_POSTGRESQL_DATABASEPASSWORD)
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
