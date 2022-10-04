import { Events } from "@/redux/currentApp/action/actionState"

export type PostgreSqlActionMode = "gui" | "sql"

export interface PostgreSqlAction extends Events {
  mode: PostgreSqlActionMode
  query: string
}

export const PostgreSqlActionInitial: PostgreSqlAction = {
  mode: "sql",
  query: "",
}
