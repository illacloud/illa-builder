import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"
import { Control, RegisterOptions } from "react-hook-form"
import { SelectOptionObject } from "@illa-design/react"

export type ControlledType =
  | "checkbox"
  | "input"
  | "number"
  | "switch"
  | "password"
  | "textarea"
  | "select"
  | "none"

type ValueType = string | boolean

export interface ControlledElementProps {
  title: string
  isRequired?: boolean
  defaultValue: ValueType[] | string | boolean
  placeholders?: string[]
  contentLabel?: string
  name: string | string[]
  styles?: Record<string, string>[]
  tips?: string | ReactNode
  error?: boolean
  labelStyle?: SerializedStyles
  tipsStyle?: SerializedStyles
  controlledType: ControlledType | ControlledType[]
  options?: string[] | number[] | SelectOptionObject[]
  control: Control
  allowClear?: boolean
  rules?: RegisterOptions[]
  onValueChange?: (value: ValueType) => void
}
