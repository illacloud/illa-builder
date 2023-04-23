import { Extension } from "@codemirror/state"
import { RefObject } from "react"
import { ICodeMirrorOptions } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { HintTooltipProps } from "@/components/CodeEditor/HintToolTip/interface"

export interface ILLACodeMirrorProps
  extends ICodeMirrorOptions,
    Omit<HintTooltipProps, "isEditorFocused" | "children"> {
  extensions?: Extension[]
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  height?: string
  minHeight?: string
  maxHeight?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  editable?: boolean
  readOnly?: boolean
  placeholder?: string
  className?: string
  tooltipContainer?: RefObject<HTMLElement>
}
