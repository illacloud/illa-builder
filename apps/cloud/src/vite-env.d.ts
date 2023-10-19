/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ILLA_API_BASE_URL: string
  readonly ILLA_BUILDER_URL: string
  readonly ILLA_MARKET_URL: string
  readonly ILLA_CLOUD_URL: string
  readonly ILLA_INSTANCE_ID: string
  readonly ILLA_SENTRY_SERVER_API: string
  readonly ILLA_MIXPANEL_KEY: string
  readonly ILLA_APP_ENV: string
  readonly ILLA_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
