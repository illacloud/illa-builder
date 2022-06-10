import { HTMLAttributes } from "react"

export enum EditorModes {
  TEXT = "text/plain",
  SQL = "sql",
  JSON = "application/json",
  JAVASCRIPT = "javascript",
  TEXT_JS = "text-js",
  TEXT_SQL = "text-sql",
  SQL_JS = "sql-js",
}

export interface CodeEditorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode: "TEXT_JS" | "SQL_JS" | "SQL" | "JAVASCRIPT" | "TEXT_SQL"
  value?: string
  lineNumbers?: boolean
  height?: string
  placeholder?: string
  onBlur?: () => void
  onChange?: (value: string) => void
}
