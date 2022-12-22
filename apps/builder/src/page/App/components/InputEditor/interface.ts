import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { EditorMode, EditorModes } from "@/components/CodeEditor/interface"

export interface ControlledInputProps {
  title: string
  value: string
  onChange: (value: string) => void
  expectedType?: VALIDATION_TYPES
  placeholder?: string
  tips?: string
  lineNumbers?: boolean
  mode?: EditorMode
  style?: Record<string, string>
}
