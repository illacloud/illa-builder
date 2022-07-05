export interface RESTAPIConfigureProps {
  resourceId?: string
  onSubmit?: (data: any) => void
}

export type Params = {
  key: string
  value: string
}

export interface RESTAPIConfigureValues {
  resourceName: string
  baseURL?: string
  urlParams?: Params[]
  headers?: Params[]
  body?: Params[]
  cookiesToForward?: string[]
  forwardAllCookies?: boolean
  authentication?: string
  basicUsername?: string
  basicPassword?: string
  bearerToken?: string
  oauth2UseClientCredentialsAuth?: boolean
  oauth2CallbackUrl?: string
  oauthAuthUrl?: string
  oauth2AccessTokenUrl?: string
  oauth2ClientId?: string
  oauth2ClientSecret?: string
  oauth2Scope?: string
  oauth2Audience?: string
  oauth2AccessToken?: string
  oauth2RefreshToken?: string
  oauth2AccessTokenLifespanSeconds?: number
  oauth2ShareUserCredentials?: boolean
  databaseName: string
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
  url?: string
  urlParams?: Params[]
  headers?: Params[]
  contentType?: ContentType
  body?: BodyParams[] | string
  cookies?: Params[]
}

export interface RESTAPIParamProps {
  config?: RESTAPIParamValues
  onChange?: (config: RESTAPIParamValues) => void
}
