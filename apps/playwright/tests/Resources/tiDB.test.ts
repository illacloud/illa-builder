import { test } from "@playwright/test"

test.describe("TiDB create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("TidbIconTiDB").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByPlaceholder("Hostname").click()
    await page.getByPlaceholder("Hostname").fill(process.env.ILLA_TIDB_HOST)
    await page.getByPlaceholder("4000").click()
    await page.getByPlaceholder("4000").fill(process.env.ILLA_TIDB_PORT)
    await page.getByPlaceholder("acme_production").click()
    await page
      .getByPlaceholder("acme_production")
      .fill(process.env.ILLA_TIDB_DATABASENAME)
    await page.getByPlaceholder("Password").click()
    await page
      .getByPlaceholder("Password")
      .fill(process.env.ILLA_TIDB_DATABASEPASSWORD)
    await page.getByPlaceholder("Username").click()
    await page
      .getByPlaceholder("Username")
      .fill(process.env.ILLA_TIDB_DATABASEUSERNAME)
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
