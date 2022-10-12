export interface RedisResource {
  host: string
  port: string
  databaseIndex: number
  databaseUsername: string
  databasePassword: string
  ssl: boolean
}
