export interface AppsState {
  list: DashboardApp[]
}

export interface DashboardApp {
  appId: string
  appName: string
  appActivity?: string
}

export const AppsInitialState: AppsState = {
  list: [],
}
