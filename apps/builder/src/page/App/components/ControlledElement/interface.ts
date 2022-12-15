import { Control, RegisterOptions } from "react-hook-form"
import { ReactNode } from "react"

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
  controlledType: string | string[]
  control: Control
  rules?: RegisterOptions
  onValueChange?: (value: string | boolean) => void
}
