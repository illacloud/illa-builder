export interface Params {
  key: string
  value: string
  [key: string]: string
}

export enum GraphQLAuthType {
  NONE = "none",
  BASIC = "basic",
  BEARER = "bearer",
  APIKEY = "API key",
}

export enum GraphQLAuthValue {
  NONE = "none",
  BASIC = "basic",
  BEARER = "bearer",
  APIKEY = "apiKey",
}

export const GraphQLAuthTypeSelect = [
  {
    label: GraphQLAuthType.NONE,
    value: GraphQLAuthValue.NONE,
  },
  {
    label: GraphQLAuthType.BASIC,
    value: GraphQLAuthValue.BASIC,
  },
  {
    label: GraphQLAuthType.BEARER,
    value: GraphQLAuthValue.BEARER,
  },
  {
    label: GraphQLAuthType.APIKEY,
    value: GraphQLAuthValue.APIKEY,
  },
]

export type GraphQLAuth = BasicAuth | BearerAuth | ApiKeyAuth

export interface BasicAuth {
  username: string
  password: string
}

export interface BearerAuth {
  bearerToken: string
}

export interface ApiKeyAuth {
  key: string
  value: string
  addTo: APIKeyAddToValue
  headerPrefix: string
}

export enum APIKeyAddToType {
  HEADER = "Header",
  URLPARAMS = "URL Params",
}

export enum APIKeyAddToValue {
  HEADER = "header",
  URLPARAMS = "urlParams",
}

export const APIKeyAddToSelect = [
  {
    label: APIKeyAddToType.HEADER,
    value: APIKeyAddToValue.HEADER,
  },
  {
    label: APIKeyAddToType.URLPARAMS,
    value: APIKeyAddToValue.URLPARAMS,
  },
]

export interface GraphQLResource<T extends GraphQLAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: GraphQLAuthValue
  disableIntrospection: boolean
  authContent: T
}
