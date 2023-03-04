export interface CouchdbResource {
  host: string
  port: string
  username: string
  password: string
  ssl: boolean
}

export const CouchdbResourceInitial: CouchdbResource = {
  host: "",
  port: "5984",
  username: "",
  password: "",
  ssl: false,
}
