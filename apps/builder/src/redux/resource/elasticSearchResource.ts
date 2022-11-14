export interface ElasticSearchResource {
  host: string
  port: string
  databaseUsername: string
  databasePassword: string
}

export const ElasticSearchResourceInitial: ElasticSearchResource = {
  databasePassword: "",
  databaseUsername: "",
  host: "",
  port: "",
}
