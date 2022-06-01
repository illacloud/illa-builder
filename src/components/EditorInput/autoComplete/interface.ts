import { HTMLAttributes } from "react"

type itemType =
  | "String"
  | "Number"
  | "Array"
  | "Function"
  | "Object"
  | "Component"
  | "Null"
export interface ACItemProps extends HTMLAttributes<HTMLDivElement> {
  type: itemType
  content: string
}
