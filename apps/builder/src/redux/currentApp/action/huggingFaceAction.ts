import { Events } from "@/redux/currentApp/action/actionState"

export type HuggingFaceParametesType = "text" | "json" | "pairs" | "binary"

export const ParametersTypeMap = [
  {
    label: 'Fill in "inputs" parameter with key-value',
    value: "pairs",
  },
  {
    label: 'Fill in "inputs" parameter with text',
    value: "text",
  },
  {
    label: 'Fill in "inputs" parameter with JSON',
    value: "json",
  },
  {
    label: "Binary",
    value: "binary",
  },
]

export interface Params {
  key: string
  value: string
}

export type PairsBody = Params[]
export type TextRawBody = string
export type JSONRawBody = string
export type BinaryBody = string

export const PairsBodyInitital = [
  {
    key: "",
    value: "",
  },
]

export const InputInitial = ""

export type HuggingFaceBodyContent =
  | TextRawBody
  | JSONRawBody
  | PairsBody
  | BinaryBody

export interface RawBody<T extends HuggingFaceBodyContent> {
  type: HuggingFaceParametesType
  content: T
}

export const HuggingFaceRawBodyInitial: RawBody<TextRawBody> = {
  type: "text",
  content: "",
}

export const BooleanTypes = ["useCache", "waitForModel"]
export const BooleanValueMap = {
  false: false,
  true: true,
}

export interface HuggingFaceAction<T extends HuggingFaceBodyContent>
  extends Events {
  modelID?: string
  inputs: RawBody<T>
  withDetailParams: boolean
  detailParams: {
    useCache: string
    waitForModel: string
    minLength: string
    maxLength: string
    topK: string
    topP: string
    temperature: string
    repetitionPenalty: string
    maxTime: string
  }
}

export const HuggingFaceActionInitial: HuggingFaceAction<HuggingFaceBodyContent> =
  {
    modelID: "",
    inputs: HuggingFaceRawBodyInitial,
    withDetailParams: false,
    detailParams: {
      useCache: "",
      waitForModel: "",
      minLength: "",
      maxLength: "",
      topK: "",
      topP: "",
      temperature: "",
      repetitionPenalty: "",
      maxTime: "",
    },
  }
