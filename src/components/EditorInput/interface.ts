import CodeMirror from "codemirror"
import { HTMLAttributes } from "react"

type EditorMode = "javascript" | "sql" | "sql-js" | "application/json"

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

export interface HintBodyParamsProps {
  show: boolean
  top: number
  left: number
}
