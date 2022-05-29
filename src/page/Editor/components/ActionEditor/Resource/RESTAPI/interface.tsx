export interface RESTAPIConfigureProps {
  resourceId?: string
}

export type Params = {
  key: string
  value: string
}

export interface RESTAPIConfigureValues {
  Name: string
  BaseURL?: string
  URLParameters?: Params[]
  Headers?: Params[]
  ExtraBodyValues?: Params[]
  CookiesToForward?: string[]
  ForwardAllCookies?: boolean
  Authentication?: string
  BasicAuthUsername?: string
  BasicAuthPassword?: string
  UseClientCredentialsAuth?: boolean
  OAuthCallbackURL?: string
  ShareOAuth2CredentialsBetweenUsers?: boolean
  AuthorizationURL?: string
  AccessTokenURL?: string
  ClientId?: string
  ClientSecret?: string
  Scopes?: string
  Audience?: string
  AccessToken?: string
  RefreshToken?: string
  AccessTokenLifespan?: number
  EnableAuthVerificationEndpoint?: boolean
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export type ContentType =
  | "json"
  | "raw"
  | "x-www-form-urlencoded"
  | "form-data"
  | "binary"
  | "none"

export interface BodyParams extends Params {
  type?: "text" | "file"
}

export interface BodyProps {
  value?: BodyParams[] | string
  onChange?: (newValue: BodyParams[] | string) => void
}

export interface RESTAPIParamValues {
  method?: HTTPMethod
  path?: string
  URLParameters?: Params[]
  Headers?: Params[]
  ContentType?: ContentType
  Body?: BodyParams[] | string
  Cookies?: Params[]
}

export interface RESTAPIParamProps {
  config?: RESTAPIParamValues
  onChange?: (config: RESTAPIParamValues) => void
}
