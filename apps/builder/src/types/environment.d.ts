declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ILLA_API_BASE_URL: string
      readonly ILLA_INSTANCE_ID: string
      readonly ILLA_SENTRY_ENV: string
      readonly ILLA_SENTRY_SERVER_API: string
      readonly ILLA_APP_VERSION: string
      readonly ILLA_APP_ENV: string
      readonly ILLA_GOOGLE_MAP_KEY: string
    }
  }
}

export {}
