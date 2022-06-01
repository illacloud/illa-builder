import { HTMLAttributes } from "react"
import CodeMirror from "codemirror"

type EditorMode = "javascript" | "sql" | "sql-js"

export interface EditorInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode: EditorMode
  lineNumbers?: boolean
  height?: string
  placeholder?: string
  cmValue?: CodeMirror.EditorConfiguration["value"]
  readOnly?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
}
