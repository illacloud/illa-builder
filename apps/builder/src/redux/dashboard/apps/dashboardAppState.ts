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
  mainlineVersion: number
  releaseVersion: number
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
  mainlineVersion: 0,
  releaseVersion: 0,
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
