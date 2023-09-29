import { test } from "@playwright/test"

test.describe("HuggingFaceAPI create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("HuggingFaceIconHugging FaceInference API").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page.locator('input[type="password"]').click()
    await page
      .locator('input[type="password"]')
      .fill(process.env.ILLA_HUGGINGFACE_TOKEN)
    await page.getByRole("button", { name: "Save Resource" }).click()
  })

  test.afterEach("Close Modal", async ({ page }) => {
    await page.getByRole("button", { name: "MoreIcon" }).first().click()
    await page.getByText("Delete").click()
    await page.getByRole("button", { name: "Delete" }).click()
    await page.getByText("SuccessCircleIconDeleted successfully").click()
  })
})
