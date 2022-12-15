import { ClickhouseSSL } from "./resourceState"

export interface ClickhouseResource {
  host: string
  port: string
  databaseName: string
  username: string
  password: string
  ssl: ClickhouseSSL
}
