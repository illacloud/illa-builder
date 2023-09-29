import { test } from "@playwright/test"

test.describe("GoogleSheets create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("GoogleSheetIconGoogle Sheets").click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .click()
    await page
      .getByPlaceholder('i.e."Users DB(readonly)" or "Internal Admin API"')
      .fill("test")
    await page
      .getByPlaceholder(
        '{\r\n  "type": "service_account",\r\n  "project_id": "projectId",\r\n  "private_key_id": "privateKeyId",\r\n  "private_key": "-----BEGIN PRIVATE KEY-----\r\nprivateKey\r\n-----END PRIVATE KEY-----",\r\n  "client_email": "clientEmail",\r\n  "client_id": "100000000000000000000",\r\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\r\n  "token_uri": "https://oauth2.googleapis.com/token",\r\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\r\n  "client_x509_cert_url": "clientx509CertUrl"\r\n}',
      )
      .click()
    await page
      .getByPlaceholder(
        '{\r\n  "type": "service_account",\r\n  "project_id": "projectId",\r\n  "private_key_id": "privateKeyId",\r\n  "private_key": "-----BEGIN PRIVATE KEY-----\r\nprivateKey\r\n-----END PRIVATE KEY-----",\r\n  "client_email": "clientEmail",\r\n  "client_id": "100000000000000000000",\r\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\r\n  "token_uri": "https://oauth2.googleapis.com/token",\r\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\r\n  "client_x509_cert_url": "clientx509CertUrl"\r\n}',
      )
      .fill(process.env.ILLA_GOOGLESHEETS_PRIVATEKEY)
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
