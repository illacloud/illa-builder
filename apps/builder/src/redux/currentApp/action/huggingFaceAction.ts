import { Events } from "@/redux/currentApp/action/actionState"
import {
  BinaryBody,
  BodyType,
  FormDataBody,
  NoneBody,
  RawBody,
  RawBodyContent,
  TextRawBody,
  XWWWFormURLEncodedBody,
} from "@/redux/currentApp/action/restapiAction"

export interface Params {
  key: string
  value: string
}

export const HuggingFaceRawBodyInitial: RawBody<TextRawBody> = {
  type: "json",
  content: "",
}

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
