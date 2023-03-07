export interface BuilderInfo {
  version: string
  language: string
}

export const BuilderInfoInitialState: BuilderInfo = {
  version: import.meta.env.ILLA_APP_VERSION,
  language: "English",
}
