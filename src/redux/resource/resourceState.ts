import { extend } from "lodash"

export type ResourceType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"

export type ResourceContent = object

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

export interface MysqlResource extends ResourceContent {
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

export interface RestApiResource<T extends RestApiAuth>
  extends ResourceContent {
  method: string
  baseUrl: string
  urlParams: Record<string, string>
  headers: Record<string, string>
  cookies: Record<string, string>
  authentication: string
  authContent: T
}

export type RestApiAuth = object

export interface BasicAuth extends RestApiAuth {
  username: string
  password: string
}

export interface BearerAuth extends RestApiAuth {
  token: string
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
