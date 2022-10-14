import { DbSSL } from "./resourceState"

export interface MysqlLikeResource {
  host: string
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}
