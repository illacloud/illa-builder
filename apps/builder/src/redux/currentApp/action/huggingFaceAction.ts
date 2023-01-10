import { Events } from "@/redux/currentApp/action/actionState"

export interface Params {
  key: string
  value: string
  [key: string]: string
}

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

export const HuggingFaceRawBodyInitial: RawBody<TextRawBody> = {
  type: "json",
  content: "",
}

export type RawBodyContent =
  | TextRawBody
  | JavaScriptRawBody
  | JSONRawBody
  | HTMLRawBody
  | XMLRawBody

export type HuggingFaceBodyContent =
  | NoneBody
  | FormDataBody
  | XWWWFormURLEncodedBody
  | BinaryBody
  | RawBody<RawBodyContent>

export interface HuggingFaceAction<T extends HuggingFaceBodyContent>
  extends Events {
  url: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  method: "POST"
  bodyType: BodyType
  body: T
}

export const HuggingFaceActionInitial: HuggingFaceAction<HuggingFaceBodyContent> =
  {
    url: "",
    method: "POST",
    urlParams: [{ key: "", value: "" } as Params],
    headers: [{ key: "", value: "" } as Params],
    cookies: [{ key: "", value: "" } as Params],
    bodyType: "raw",
    body: HuggingFaceRawBodyInitial,
  }
