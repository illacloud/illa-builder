import { Events } from "./actionState"

export type MicrosoftSqlActionMode = "gui" | "sql"

export type MicrosoftSqlActionSqlMode = {
  sql: string
}

export type MicrosoftSqlActionGUIMode = {
  table: string
  type: string
  records: string
}

export type MicrosoftSqlActionType =
  | MicrosoftSqlActionSqlMode
  | MicrosoftSqlActionGUIMode

export interface MicrosoftSqlAction<T extends MicrosoftSqlActionType>
  extends Events {
  mode: MicrosoftSqlActionMode
  query: T
}

export const MicrosoftSqlActionSqlModeInitial: MicrosoftSqlActionSqlMode = {
  sql: "",
}

export const MicrosoftSqlActionGUIModeInitial: MicrosoftSqlActionGUIMode = {
  table: "",
  type: "bulk_insert",
  records: "",
}

export const MicrosoftSqlActionInitial: MicrosoftSqlAction<MicrosoftSqlActionType> =
  {
    mode: "sql",
    query: MicrosoftSqlActionSqlModeInitial,
  }
