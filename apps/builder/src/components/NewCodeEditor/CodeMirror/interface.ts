import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { ICodeMirrorOptions } from "@/components/NewCodeEditor/CodeMirror/extensions/interface"
import { HintTooltipProps } from "@/components/NewCodeEditor/HintToolTip/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface ILLACodeMirrorProps
  extends ICodeMirrorOptions,
    Omit<HintTooltipProps, "isEditorFocused" | "children"> {
  extensions?: Extension[]
  value?: string
  onChange?: (value: string) => void
  height?: string
  minHeight?: string
  maxHeight?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  editable?: boolean
  readOnly?: boolean
  placeholder?: string
}

// export interface ILLACodeMirrorExtWrapperProps {
//   showLineNumbers?: boolean
//   lang?: "javascript" | "sql"
//   placeholder?: string
//   value?: string
//   onChange?: (value: string) => void
// }
