import {
  RESTAPIConfigureValues,
  MySQLConfigureValues,
} from "@/page/App/components/ActionEditor/Resource"

export interface DashboardResource {
  resourceId: string
  resourceName: string
  resourceType: string
  databaseName: string
  createdBy: string
  lastModifiedBy: string
  createdAt: string
  lastModifiedAt: string
}

export interface Resource extends DashboardResource {
  options: MySQLConfigureValues | RESTAPIConfigureValues
}

export type ResourceListState = Resource[]
export const resourceInitialState: ResourceListState = []
