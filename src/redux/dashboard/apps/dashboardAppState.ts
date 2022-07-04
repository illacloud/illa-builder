export interface DashboardAppsState {
  list: DashboardApp[]
}

export interface DashboardApp {
  appId: string
  appName: string
  versionId: string
  appActivity?: string
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
}
