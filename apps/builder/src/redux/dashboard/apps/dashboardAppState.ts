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
  waterMark: boolean
  publishedToMarketplace: boolean
  description?: string
}

interface EditorInfo {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

export interface DashboardApp {
  appId: string
  appName: string
  deployed: boolean
  updatedAt: string
  updatedBy: string
  appActivity: DashboardAppActivity
  config: DashboardAppConfig
  editedBy?: EditorInfo[]
}

export const DashboardAppInitialState: DashboardApp = {
  updatedAt: "",
  updatedBy: "",
  appId: "",
  appName: "",
  deployed: false,
  config: {
    public: false,
    waterMark: false,
    publishedToMarketplace: false,
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
