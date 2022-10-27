export interface RedisResource {
  host: string
  port: string
  databaseIndex: number
  databaseUsername: string
  databasePassword: string
  ssl: boolean
}

export const RedisResourceInitial: RedisResource = {
  databaseIndex: 0,
  databasePassword: "",
  databaseUsername: "",
  host: "",
  port: "",
  ssl: false,
}
