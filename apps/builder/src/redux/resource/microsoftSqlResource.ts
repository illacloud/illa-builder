import { MicrosoftSqlSSL } from "./resourceState"

export interface MicrosoftSqlResource {
  host: string
  port: string
  databaseName: string
  username: string
  password: string
  ssl: MicrosoftSqlSSL
  connectionOpts: {
    key: string
    value: string
  }[]
}
