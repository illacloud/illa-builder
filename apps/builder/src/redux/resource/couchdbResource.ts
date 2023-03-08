export interface CouchdbResource {
  host: string
  port: string
  username: string
  password: string
  ssl: boolean
}

export const CouchdbResourceInitial: CouchdbResource = {
  host: "",
  port: "",
  username: "",
  password: "",
  ssl: false,
}
