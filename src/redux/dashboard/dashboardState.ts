export interface DashboardState {
  appsState: AppsState
  resourcesState: ResourcesState
}

export interface AppsState {
  co: number
}

export interface ResourcesState {}

export const AppsInitialState: AppsState = {
  co: 1,
}

export const ResourcesInitialState: ResourcesState = {}

export const DashboardInitialState: DashboardState = {
  appsState: AppsInitialState,
  resourcesState: ResourcesInitialState,
}
