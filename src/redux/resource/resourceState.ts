export type ResourceType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"

export type ResourceContent = MysqlResource | RestApiResource<RestApiAuth>

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
  ssh: MysqlSSH
  ssl: MysqlSSL
}

export interface MysqlSSH {
  ssh: boolean
  sshHost: string
  sshPort: string
  sshUsername: string
  sshPassword: string
  sshPrivateKey: string
  sshPassphrase: string
}

export interface MysqlSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
}

export interface Params {
  key: string
  value: string
}

export interface RestApiResource<T extends RestApiAuth> {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: string
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
