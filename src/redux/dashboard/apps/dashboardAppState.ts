export interface DashboardAppsState {
  list: DashboardApp[]
  url: string
}

export interface DashboardApp {
  appId: string
  appName: string
  appActivity?: string
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
  url: "",
}
