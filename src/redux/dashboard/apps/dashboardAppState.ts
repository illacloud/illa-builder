export interface DashboardAppsState {
  list: DashboardApp[]
}

export interface DashboardApp {
  appId: string
  appName: string
  currentVersionId: string
  appActivity?: string
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
}
