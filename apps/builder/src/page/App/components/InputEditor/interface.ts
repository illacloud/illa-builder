import { ReactNode } from "react"
import { EditorMode } from "@/components/CodeEditor/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface ControlledInputProps {
  title?: string
  value: string
  onChange: (value: string) => void
  expectedType?: VALIDATION_TYPES
  placeholder?: string
  tips?: string | ReactNode
  lineNumbers?: boolean
  mode?: EditorMode
  style?: Record<string, string>
}
