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
  databaseName: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

export interface MysqlResource extends ResourceContent {}

export interface RestApiResource extends ResourceContent {}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = []
