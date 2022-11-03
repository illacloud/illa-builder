interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_INSTANCE_ID: string
  readonly VITE_SENTRY_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
