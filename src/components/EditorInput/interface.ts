import { SerializedStyles } from "@emotion/react"

type EditorMode = "javascript" | "sql" | "text-js"

export interface EditorInputProps {
  _css?: SerializedStyles
  mode: EditorMode
  value?: string
  lineNumbers?: boolean
  height?: string
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}
