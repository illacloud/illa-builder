type EditorMode = "javascript" | "sql"

export interface EditorInputProps {
  mode: EditorMode
  lineNumbers?: boolean
  height?: string
  placeholder?: string
}
