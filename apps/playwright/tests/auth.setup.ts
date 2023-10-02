import { notNeedAuthCloudRequest } from "@illa-public/illa-net"
import { test as setup } from "@playwright/test"

const authFile = ".auth/user.json"

setup("authenticate", async ({ page }) => {
  const result = await notNeedAuthCloudRequest({
    method: "POST",
    url: "/auth/signin",
    data: {
      email: process.env.ILLA_CLOUD_USER_EMAIL,
      password: process.env.ILLA_CLOUD_USER_PASSWORD,
    },
  })
  const token = result.headers["illa-token"]
  await page.goto(
    `/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps?token=${token}`,
  )
  await page.context().storageState({ path: authFile })
})
