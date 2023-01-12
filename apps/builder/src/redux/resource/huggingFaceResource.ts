export interface Params {
  key: string
  value: string
}

export interface HuggingFaceResource {
  baseURL: string
  authContent: {
    token: string
  }
  authentication: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
}
