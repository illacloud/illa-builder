export enum CODE_TYPE {
  "EXPRESSION" = "EXPRESSION",
  "FUNCTION" = "FUNCTION",
}

export enum CODE_LANG {
  "JAVASCRIPT" = "javascript",
  "SQL" = "sql",
  "HTML" = "html",
  "JSON" = "json",
  "XML" = "xml",
  "PGSQL" = "pgsql",
  "MYSQL" = "mysql",
  "MARIASQL" = "mariasql",
  "MSSQL" = "mssql",
  "SQLite" = "sqlite",
  "CASSANDRA" = "cassandra",
  "PLSQL" = "plsql",
}

export interface IExpressionShape {
  value: string
  hasError: boolean
}

export interface ICodeMirrorOptions {
  showLineNumbers?: boolean
  lang?: CODE_LANG
  codeType?: CODE_TYPE
  expressions?: IExpressionShape[]
  executionResult?: Record<string, unknown>
  canShowCompleteInfo?: boolean
  sqlScheme?: Record<string, unknown>
  singleLine?: boolean
}
