import { SerializedStyles } from "@emotion/react"
import { ILLACodeMirrorProps } from "@/components/CodeEditor/CodeMirror/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface CodeEditorProps
  extends Omit<
    ILLACodeMirrorProps,
    | "hasError"
    | "resultType"
    | "result"
    | "executionResult"
    | "expressions"
    | "canShowResultRealtime"
  > {
  expectValueType?: VALIDATION_TYPES
  wrappedCodeFunc?: (value: string) => string
  canExpand?: boolean
  modalTitle?: string
  modalDescription?: string
  wrapperCss?: SerializedStyles
}
