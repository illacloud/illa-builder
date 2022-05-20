export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export type ContentType =
  | "json"
  | "raw"
  | "x-www-form-urlencoded"
  | "form-data"
  | "binary"
  | "none"

interface Params {
  key: string
  value: string
}
interface BodyParams extends Params {
  type?: "text" | "file"
}

export interface RESTAPIPanelProps {
  methed?: HTTPMethod
  path?: string
  URLParameters?: Params[]
  Headers?: Params[]
  ContentType?: ContentType
  Body?: BodyParams[]
  Cookies?: Params[]
}
