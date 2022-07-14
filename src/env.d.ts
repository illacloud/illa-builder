interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_INSTANCE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
