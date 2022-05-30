export interface ResourcesState {
  list: DashboardResource[]
}

export interface DashboardResource {
  resourceId: string
  resourceName: string
  resourceType: string
  dbName: string
  created: string
}

export const ResourcesInitialState: ResourcesState = {
  list: [],
}
