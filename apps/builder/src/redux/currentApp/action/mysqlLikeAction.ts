export type MysqlLikeActionMode = "gui" | "sql"

export interface MysqlLikeAction {
  mode: MysqlLikeActionMode
  query: string
}

export const MysqlLikeActionInitial: MysqlLikeAction = {
  mode: "sql",
  query: "",
}
