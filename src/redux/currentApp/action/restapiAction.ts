import { Params } from "@/redux/resource/resourceState"

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

export interface RestApiAction<T extends BodyContent> {
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
  urlParams: [],
  headers: [],
  cookies: [],
  bodyType: "none",
  body: null,
}
