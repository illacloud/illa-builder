export interface ElasticSearchResource {
  host: string
  port: string
  username: string
  password: string
}

export const ElasticSearchResourceInitial: ElasticSearchResource = {
  username: "",
  password: "",
  host: "",
  port: "",
}
