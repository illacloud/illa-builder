import { HTMLAttributes } from "react"

export type EditorModes = "sql" | "javascript" | "text-js" | "sql-js"

export interface CodeInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode: EditorModes
  value?: string
  lineNumbers?: boolean
  readOnly?: boolean
  height?: string
  placeholder?: string
  onBlur?: () => void
  onChange?: (value: string) => void
}
