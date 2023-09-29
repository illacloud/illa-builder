import { test } from "@playwright/test"

test.describe("FireBase create And delete", () => {
  test.beforeEach("Show create Modal", async ({ page }) => {
    await page.goto(`/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps`)
    await page.getByText("Resources").click()
    await page.getByRole("button", { name: "Create New" }).click()
  })

  test("create Resource", async ({ page }) => {
    await page.getByText("FirebaseIconFirebase").click()
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
      .fill(process.env.ILLA_FIREBASE_DATABASEURL)
    await page.getByRole("textbox").nth(2).click()
    await page
      .getByRole("textbox")
      .nth(2)
      .fill(process.env.ILLA_FIREBASE_PROJECTID)
    await page
      .getByPlaceholder(
        '{\n  "type": "service_account",\n  "project_id": "projectId",\n  "private_key_id": "privateKeyId",\n  "private_key": "-----BEGIN PRIVATE KEY-----\nprivateKey\n-----END PRIVATE KEY-----",\n  "client_email": "clientEmail",\n  "client_id": "100000000000000000000",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "clientx509CertUrl"\n}',
      )
      .click()
    await page
      .getByPlaceholder(
        '{\n  "type": "service_account",\n  "project_id": "projectId",\n  "private_key_id": "privateKeyId",\n  "private_key": "-----BEGIN PRIVATE KEY-----\nprivateKey\n-----END PRIVATE KEY-----",\n  "client_email": "clientEmail",\n  "client_id": "100000000000000000000",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "clientx509CertUrl"\n}',
      )
      .fill(process.env.ILLA_FIREBASE_PRIVATEKEY)
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
