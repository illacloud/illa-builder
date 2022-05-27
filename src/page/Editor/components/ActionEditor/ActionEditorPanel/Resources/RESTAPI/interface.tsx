export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export type ContentType =
  | "json"
  | "raw"
  | "x-www-form-urlencoded"
  | "form-data"
  | "binary"
  | "none"

export interface Params {
  key: string
  value: string
}

export interface BodyParams extends Params {
  type?: "text" | "file"
}

export interface BodyProps {
  value?: BodyParams[] | string
  onChange?: (newValue: BodyParams[] | string) => void
}

export interface RESTAPIPanelConfig {
  method?: HTTPMethod
  path?: string
  URLParameters?: Params[]
  Headers?: Params[]
  ContentType?: ContentType
  Body?: BodyParams[] | string
  Cookies?: Params[]
}

export interface RESTAPIPanelProps {
  config?: RESTAPIPanelConfig
  onChange?: (config: RESTAPIPanelConfig) => void
}
