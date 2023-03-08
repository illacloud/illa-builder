export type OracleDBActionModeType = "sql" | "gui"

export interface OracleDBActionSQLMode {
  raw: string
}

export const OracleDBActionSQLModeInitial = {
  raw: "",
}

export interface OracleDBActionGUIMode {}

export type OracleDBActionType = OracleDBActionGUIMode | OracleDBActionSQLMode

export interface OracleDBAction<T extends OracleDBActionType> {
  mode: OracleDBActionModeType
  opts: T
}

export const OracleDBActionInitial: OracleDBAction<OracleDBActionType> = {
  mode: "sql",
  opts: OracleDBActionSQLModeInitial,
}
