export interface DashboardAppsState {
  list: DashboardApp[]
  url: string
}

export interface DashboardApp {
  appId: string
  appName: string
  currentVersionId: string
  appActivity?: string
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
  url: "",
}
