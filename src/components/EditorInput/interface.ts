import { SerializedStyles } from "@emotion/react"

type EditorMode = "javascript" | "sql"

export interface EditorInputProps {
  _css?: SerializedStyles
  mode: EditorMode
  lineNumbers?: boolean
  height?: string
  placeholder?: string
}
