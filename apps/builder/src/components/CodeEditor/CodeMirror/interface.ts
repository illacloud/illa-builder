import { Extension } from "@codemirror/state"
import { SerializedStyles } from "@emotion/react"
import { ICodeMirrorOptions } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { HintTooltipProps } from "@/components/CodeEditor/HintToolTip/interface"

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
  wrapperCss?: SerializedStyles
}
