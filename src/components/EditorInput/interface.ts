import { SerializedStyles } from "@emotion/serialize"

type EditorMode = "javascript" | "sql"

export interface EditorInputProps {
  mode: EditorMode
  lineNumbers?: boolean
  height?: string
  _css?: SerializedStyles
}
