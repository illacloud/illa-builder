import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

const modeExt = process.env.ILLA_APP_ENV || "development"
dotenv.config({ path: ".env" })
dotenv.config({ path: ".env.local", override: true })
dotenv.config({ path: `.env.${modeExt}.local`, override: true })

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ILLA_BUILDER_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
      dependencies: ["setup"],
    },
  ],
})
