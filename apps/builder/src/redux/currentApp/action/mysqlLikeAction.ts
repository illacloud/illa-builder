import { Events } from "./actionState"

export type MysqlLikeActionMode = "gui" | "sql" | "sql-safe"

export interface MysqlLikeAction extends Events {
  mode: MysqlLikeActionMode
  query: string
}

export const MysqlLikeActionInitial: MysqlLikeAction = {
  mode: "sql-safe",
  query: "",
}
