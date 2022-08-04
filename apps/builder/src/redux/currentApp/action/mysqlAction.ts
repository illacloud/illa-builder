import { Events } from "@/redux/currentApp/action/actionState"

export type MysqlActionMode = "gui" | "sql"

export interface MysqlAction extends Events {
  mode: MysqlActionMode
  query: string
}

export const MysqlActionInitial: MysqlAction = {
  mode: "sql",
  query: "",
}
