import { ReactNode } from "react"
import {
  CODE_LANG,
  ICodeMirrorOptions,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface ControlledInputProps
  extends Pick<
    ICodeMirrorOptions,
    "sqlScheme" | "canShowCompleteInfo" | "codeType"
  > {
  title?: string
  subtitle?: string
  handleSubtitleClick?: () => void
  value: string
  onChange: (value: string) => void
  expectedType?: VALIDATION_TYPES
  placeholder?: string
  tips?: string | ReactNode
  showSafeModeTips?: boolean
  lineNumbers?: boolean
  mode?: CODE_LANG
  hasExpectedType?: boolean
  popoverContent?: string
  style?: {
    height?: string
    minHeight?: string
    maxHeight?: string
    width?: string
    mixWidth?: string
    maxWidth?: string
  }
}
