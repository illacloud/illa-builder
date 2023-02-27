import { ClickhouseSSL } from "./resourceState"

export interface ClickhouseResource {
  host: string
  port: string | number
  databaseName: string
  username: string
  password: string
  ssl: ClickhouseSSL
}
