export interface DashboardAppsState {
  list: DashboardApp[]
  url: string
}

export interface DashboardAppActivity {
  modifier: string
  modifiedAt: string
}

export interface DashboardAppConfig {
  public: boolean
}

export interface DashboardApp {
  appId: string
  appName: string
  currentVersionId: string
  mainline_version: number
  release_version: number
  updatedAt: string
  updatedBy: string
  appActivity: DashboardAppActivity
  config: DashboardAppConfig
}

export const DashboardAppInitialState: DashboardApp = {
  updatedAt: "",
  updatedBy: "",
  appId: "",
  appName: "",
  currentVersionId: "",
  mainline_version: 0,
  release_version: 0,
  config: {
    public: false,
  },
  appActivity: {
    modifier: "",
    modifiedAt: "",
  },
}

export const DashboardAppsInitialState: DashboardAppsState = {
  list: [],
  url: "",
}
