const SAFE_MODE_ACTION_TYPE = [
  "clickhouse",
  "supabasedb",
  "mysql",
  "tidb",
  "mariadb",
  "postgresql",
  "snowflake",
  "neon",
  "hydra",
  "mssql",
  "oracle",
  "oracle9i",
]

export const isSafeModeAction = (actionType: string) => {
  return SAFE_MODE_ACTION_TYPE.includes(actionType)
}
