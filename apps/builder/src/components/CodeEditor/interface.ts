import { ILLACodeMirrorProps } from "@/components/CodeEditor/CodeMirror/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface CodeEditorProps
  extends Omit<
    ILLACodeMirrorProps,
    "hasError" | "resultType" | "result" | "executionResult" | "expressions"
  > {
  expectValueType?: VALIDATION_TYPES
  wrappedCodeFunc?: (value: string) => string
}
