export interface DashboardResource {
  resourceId: string
  resourceName: string
  resourceType: ResourceType
  databaseName: string
  createdBy: string
  lastModifiedBy: string
  createdAt: string
  updatedAt: string
}

export type ResourceType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"

export interface Resource extends DashboardResource {}

export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
