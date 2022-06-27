import { HTMLAttributes } from "react"

export type AutoCompleteItemType =
  | "String"
  | "Number"
  | "Array"
  | "Function"
  | "Object"
  | "Component"
  | "Null"

export interface AutoCompleteItemProps extends HTMLAttributes<HTMLDivElement> {
  type?: AutoCompleteItemType
  content: string
}
