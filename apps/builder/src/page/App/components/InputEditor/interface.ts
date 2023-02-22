import { ReactNode } from "react"
import {
  CODE_LANG,
  ICodeMirrorOptions,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface ControlledInputProps
  extends Pick<ICodeMirrorOptions, "sqlScheme"> {
  title?: string
  value: string
  onChange: (value: string) => void
  expectedType?: VALIDATION_TYPES
  placeholder?: string
  tips?: string | ReactNode
  lineNumbers?: boolean
  mode?: CODE_LANG
  style?: Record<string, string>
}
