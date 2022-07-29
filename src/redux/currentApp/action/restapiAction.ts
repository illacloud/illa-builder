import { Params } from "@/redux/resource/resourceState"
import { Events } from "@/redux/currentApp/action/actionState"

export type BodyType = "JSON" | "none" | "form-data" | "x-www-form-urlencoded"

export type JSONBody = Record<string, string>

export type NoneBody = null

export type XWWWFormURLEncodedBody = Record<string, string>

export type FormDataBody = Record<string, string>

export type BodyContent =
  | JSONBody
  | NoneBody
  | FormDataBody
  | XWWWFormURLEncodedBody

export interface RestApiAction<T extends BodyContent> extends Events {
  method: string
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
  urlParams: [{} as Params],
  headers: [{} as Params],
  cookies: [{} as Params],
  bodyType: "none",
  body: null,
}
