export interface ResourcesState {
  list: DashboardResource[]
}

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

export const ResourcesInitialState: ResourcesState = {
  list: [],
}
