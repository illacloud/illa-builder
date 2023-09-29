import { test } from "@playwright/test"

test.describe("Appwrite create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("AppwriteIconAppwrite").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByPlaceholder("HOSTNAME OR IP").click()
    await page
      .getByPlaceholder("HOSTNAME OR IP")
      .fill(process.env.ILLA_APPWRITE_HOST)
    await page.getByPlaceholder("Database ID").click()
    await page
      .getByPlaceholder("Database ID")
      .fill(process.env.ILLA_APPWRITE_DATABASEID)
    await page.getByPlaceholder("Project ID").click()
    await page
      .getByPlaceholder("Project ID")
      .fill(process.env.ILLA_APPWRITE_PROJECTID)
    await page.getByPlaceholder("••••••••••••••••••••").click()
    await page
      .getByPlaceholder("••••••••••••••••••••")
      .fill(process.env.ILLA_APPWRITE_APIKEY)
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
