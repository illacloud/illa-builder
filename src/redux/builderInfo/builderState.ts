export interface BuilderInfo {
  version: string
  language: string
  connectStatus: {
    loading: boolean
    error: boolean
  }
}

export const BuilderInfoInitialState: BuilderInfo = {
  version: "0.0.0",
  language: "English",
  connectStatus: {
    loading: false,
    error: false,
  },
}
