export interface Params {
  key: string
  value: string
}

export interface HuggingFaceResource {
  baseUrl: string
  token: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
}
