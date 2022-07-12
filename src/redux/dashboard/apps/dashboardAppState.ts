export interface DashboardAppsState {
  list: DashboardApp[]
  url: string
}

export interface DashboardApp {
  appId: string
  appName: string
  currentVersionId: string
  updatedAt: string
  updatedBy: string
}

export const DashboardAppInitialState: DashboardApp = {
  updatedAt: "",
  updatedBy: "",
  appId: "",
  appName: "",
  currentVersionId: "",
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
  url: "",
}
