import { ReactNode } from "react"
import { Control, RegisterOptions } from "react-hook-form"

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

export interface ContrilledElementProps {
  title: string
  isRequired?: boolean
  defaultValue: ValueType[] | string | boolean
  placeholders?: string[]
  contentLabel?: string
  name: string | string[]
  styles?: Record<string, string>[]
  tips?: string | ReactNode
  error?: boolean
  controlledType: ControlledType | ControlledType[]
  options?: (
    | string
    | number
    | {
        label: ReactNode | string
        value: string | number
        disabled?: boolean
        extra?: any
      }
  )[]
  control: Control
  rules?: RegisterOptions[]
  onValueChange?: (value: ValueType) => void
}
