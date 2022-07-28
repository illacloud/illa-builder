export type MysqlActionMode = "gui" | "sql"

export interface MysqlAction {
  mode: MysqlActionMode
  query: string
}

export const MysqlActionInitial: MysqlAction = {
  mode: "sql",
  query: "",
}
