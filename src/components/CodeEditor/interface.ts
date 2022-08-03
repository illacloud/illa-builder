import { HTMLAttributes } from "react"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export enum EditorModes {
  TEXT = "text/plain",
  SQL = "sql",
  JSON = "application/json",
  JAVASCRIPT = "custom-javascript",
  TEXT_JS = "text-js",
  SQL_JS = "sql-js",
  XML_JS = "xml-js",
  HTML_JS = "html-js",
}

export type EditorMode = keyof typeof EditorModes

export interface CodeEditorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode: EditorMode
  value?: string
  expectedType: VALIDATION_TYPES
  // Whether to show line numbers to the left of the editor.
  lineNumbers?: boolean
  readOnly?: boolean
  height?: string
  border?: string
  placeholder?: string
  borderRadius?: string
  noTab?: boolean
  path?: string
  // sql table data
  tables?: Record<string, any>
  onBlur?: () => void
  onChange?: (value: string, calcResult?: any) => void
  maxHeight?: string
}

export enum DataType {
  OBJECT = "OBJECT",
  NUMBER = "NUMBER",
  ARRAY = "ARRAY",
  FUNCTION = "FUNCTION",
  BOOLEAN = "BOOLEAN",
  STRING = "STRING",
  UNKNOWN = "UNKNOWN",
}

export type FieldEntityInformation = {
  entityName?: string
  expectedType?: DataType
  entityType?: "ACTION" | "WIDGET" | "JSACTION"
  entityId?: string
  propertyPath?: string
}

export interface ResultPreview {
  state?: "default" | "error"
  type?: VALIDATION_TYPES
  content?: string
}

export interface EditorInputState {
  focus?: boolean
  error?: boolean
  border?: string
  height: string
  borderRadius: string
  maxHeight: string
}
