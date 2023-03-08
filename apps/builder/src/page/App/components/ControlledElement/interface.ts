import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"
import { Control, RegisterOptions } from "react-hook-form"
import { AlertProps, SelectOptionObject } from "@illa-design/react"

export type ControlledType =
  | "checkbox"
  | "input"
  | "number"
  | "switch"
  | "password"
  | "textarea"
  | "select"
  | "alert"
  | "radio-group"
  | "none"

type ValueType = string | boolean

export interface ControlledElementProps
  extends Omit<AlertProps, "title" | "content" | "defaultValue"> {
  title: ReactNode
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
  alertContent?: ReactNode
  forceEqualWidth?: boolean
}
