import { test } from "@playwright/test"

test.describe("ElasticSearch create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("ElasticIconElastic Search").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.getByRole("textbox").nth(1).click()
    await page
      .getByRole("textbox")
      .nth(1)
      .fill(process.env.ILLA_ELASTICSEARCH_HOST)
    await page
      .locator("div")
      .filter({ hasText: /^\*PortUpIconDownIcon$/ })
      .getByRole("textbox")
      .click()
    await page
      .locator("div")
      .filter({ hasText: /^\*PortUpIconDownIcon$/ })
      .getByRole("textbox")
      .fill(process.env.ILLA_ELASTICSEARCH_PORT)
    await page.getByRole("textbox").nth(3).click()
    await page
      .getByRole("textbox")
      .nth(3)
      .fill(process.env.ILLA_ELASTICSEARCH_USERNAME)
    await page.locator('input[type="password"]').click()
    await page
      .locator('input[type="password"]')
      .fill(process.env.ILLA_ELASTICSEARCH_PASSWORD)
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
