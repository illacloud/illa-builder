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
  | "radio-group"
  | "radio"
  | "none"

export type DefaultValueType = string | boolean | number

export interface ControlledElementProps {
  title: ReactNode
  isRequired?: boolean
  defaultValue: DefaultValueType | DefaultValueType[]
  placeholders?: string[]
  contentLabel?: string
  name: string | string[]
  styles?: Record<string, string | number>[]
  tips?: string | ReactNode
  error?: boolean
  labelStyle?: SerializedStyles
  tipsStyle?: SerializedStyles
  controlledType: ControlledType | ControlledType[]
  options?: string[] | number[] | SelectOptionObject[]
  control: Control
  allowClear?: boolean
  rules?: RegisterOptions[]
  onValueChange?: (value: DefaultValueType) => void
  forceEqualWidth?: boolean
}
