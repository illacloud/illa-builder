interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_INSTANCE_ID: string
  readonly VITE_SENTRY_ENV: string
  readonly VITE_SENTRY_SERVER_API: string
  readonly ILLA_APP_VERSION: string
  readonly ILLA_APP_ENV: string
  readonly ILLA_GOOGLE_MAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
