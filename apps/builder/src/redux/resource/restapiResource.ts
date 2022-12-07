export interface Params {
  key: string
  value: string
  [key: string]: string
}

export type RestApiAuthType = "none" | "basic" | "bearer"

export interface RestApiResource<T extends RestApiAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: RestApiAuthType
  authContent: T
}

export type RestApiAuth = BasicAuth | BearerAuth

export interface BasicAuth {
  username: string
  password: string
}

export interface BearerAuth {
  token: string
}
