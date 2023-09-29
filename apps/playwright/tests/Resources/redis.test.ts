import { test } from "@playwright/test"

test.describe("Redis create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("RedisIconRedis").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByPlaceholder("Hostname").click()
    await page.getByPlaceholder("Hostname").fill(process.env.ILLA_REDIS_HOST)
    await page.getByPlaceholder("6379").click()
    await page.getByPlaceholder("6379").fill(process.env.ILLA_REDIS_PORT)
    await page.getByPlaceholder("Username").click()
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
