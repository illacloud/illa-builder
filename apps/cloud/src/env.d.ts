/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ILLA_API_BASE_URL: string
  readonly ILLA_APP_VERSION: string
  readonly ILLA_BUILDER_URL: string
  readonly ILLA_CLOUD_URL: string
  readonly ILLA_INSTANCE_ID: string
  readonly ILLA_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
