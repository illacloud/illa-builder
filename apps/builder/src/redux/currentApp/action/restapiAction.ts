import { Events } from "@/redux/currentApp/action/actionState"
import { Params } from "@/redux/resource/restapiResource"

export type BodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary"

export type RawBodyType = "text" | "json" | "xml" | "javascript" | "html"

export type NoneBody = null

export type XWWWFormURLEncodedBody = Params[]

export type BinaryBody = string

export type FormDataBody = Params[]

export type TextRawBody = string

export type JavaScriptRawBody = string

export type JSONRawBody = string

export type HTMLRawBody = string

export type XMLRawBody = string

export interface RawBody<T extends RawBodyContent> {
  type: RawBodyType
  content: T
}

export const RawBodyInitial: RawBody<TextRawBody> = {
  type: "text",
  content: "",
}

export type RawBodyContent =
  | TextRawBody
  | JavaScriptRawBody
  | JSONRawBody
  | HTMLRawBody
  | XMLRawBody

export type BodyContent =
  | NoneBody
  | FormDataBody
  | XWWWFormURLEncodedBody
  | BinaryBody
  | RawBody<RawBodyContent>

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface RestApiAction<T extends BodyContent> extends Events {
  method: ApiMethod
  url: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  bodyType: BodyType
  body: T
}

export const RestApiActionInitial: RestApiAction<BodyContent> = {
  url: "",
  method: "GET",
  urlParams: [{ key: "", value: "" } as Params],
  headers: [{ key: "", value: "" } as Params],
  cookies: [{ key: "", value: "" } as Params],
  bodyType: "none",
  body: null,
}
