import { SerializedStyles } from "@emotion/react"
import { Doc } from "codemirror"

type EditorMode = "javascript" | "sql" | "text-js" | "application/json"

export interface EditorInputProps {
  _css?: SerializedStyles
  mode: EditorMode
  lineNumbers?: boolean
  height?: string
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  readOnly?: boolean | "nocursor"
  value?: string | Doc
}
