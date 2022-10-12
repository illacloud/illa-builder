export type ResourceType =
  | "mysql"
  | "restapi"
  | "graphql"
  | "mongodb"
  | "redis"
  | "elastic"
  | "postgresql"
  | "mariadb"
  | "snowflake"
  | "tidb"
  | "datadog"
  | "smtp"
  | "zapier"
  | "s3"

export type ResourceContent =
  | MysqlResource
  | RestApiResource<RestApiAuth>
  | PostgreSqlResource
  | RedisResource
  | MongoDbResource

export interface Resource<T extends ResourceContent> {
  resourceId: string
  resourceName: string
  resourceType: ResourceType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

export interface MysqlResource {
  host: string
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}

export interface RedisResource {
  host: string
  port: string
  databaseIndex: number
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}

export type MongoDbConnectionFormat = "standard" | "mongodb+srv"

export interface MongoDbResource {
  host: string
  connectionFormat: MongoDbConnectionFormat
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}

export interface DbSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
}

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
): DbSSL {
  return {
    ssl: open,
    clientKey: data.clientKey,
    clientCert: data.clientCert,
    serverCert: data.serverCert,
  } as DbSSL
}

export interface PostgreSqlResource {
  host: string
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: DbSSL
}

export interface Params {
  key: string
  value: string
}

export type RestApiAuthType = "none" | "basic" | "bearer"

export interface RestApiResource<T extends RestApiAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: RestApiAuthType
  authContent: T
}

export type RestApiAuth = BasicAuth | BearerAuth

export interface BasicAuth {
  username: string
  password: string
}

export interface BearerAuth {
  token: string
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
