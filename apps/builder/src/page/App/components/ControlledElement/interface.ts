import { ReactNode } from "react"
import { Control, RegisterOptions } from "react-hook-form"

export type ControlledType =
  | "input"
  | "number"
  | "switch"
  | "password"
  | "textarea"
  | "none"

export interface ContrilledElementProps {
  title: string
  isRequired?: boolean
  defaultValue: (string | boolean)[] | string | boolean
  placeholders?: string[]
  contentLabel?: string
  name: string | string[]
  styles?: Record<string, string>[]
  tips?: string | ReactNode
  error?: boolean
  controlledType: ControlledType | ControlledType[]
  control: Control
  rules?: RegisterOptions[]
  onValueChange?: (value: string | boolean) => void
}
