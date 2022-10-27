import { Events } from "./actionState"

export type MysqlLikeActionMode = "gui" | "sql"

export interface MysqlLikeAction extends Events {
  mode: MysqlLikeActionMode
  query: string
}

export const MysqlLikeActionInitial: MysqlLikeAction = {
  mode: "sql",
  query: "",
}
