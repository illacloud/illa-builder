import { ActionType } from "@/redux/currentApp/action/actionState"
import i18n from "@/i18n/config"

export type ResourceType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"

export type ResourceContent =
  | MysqlResource
  | RestApiResource<RestApiAuth>
  | PostgreSqlResource

export function getActionTypeFromResourceType(
  resourceType: ResourceType | null | undefined,
): ActionType | null {
  switch (resourceType) {
    case "mysql":
      return "mysql"
    case "restapi":
      return "restapi"
    case "mongodb":
      return "mongodb"
    case "redis":
      return "redis"
    case "postgresql":
      return "postgresql"
    default:
      return null
  }
}

export function getActionNameFromActionType(actionType: ActionType) {
  if (actionType) {
    return i18n.t(`editor.action.resource.${actionType}.name`)
  } else {
    return ""
  }
}

export function getResourceNameFromResourceType(
  resourceType: ResourceType | null | undefined,
) {
  if (resourceType) {
    return i18n.t(`editor.action.resource.${resourceType}.name`)
  } else {
    return ""
  }
}

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
  ssl: MysqlSSL
}

export interface MysqlSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
}

export interface PostgreSqlResource {
  host: string
  port: string
  databaseName: string
  databaseUsername: string
  databasePassword: string
  ssl: PostgreSSL
}

export interface PostgreSSL {
  ssl: boolean
  serverCert: string
  clientKey: string
  clientCert: string
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
