import { DashboardApp, DashboardAppConfig } from "./dashboardAppState"

export interface AddDashboardAppPayload {
  app: DashboardApp
  index?: number
}

export interface RenameDashboardAppPayload {
  appId: string
  newName: string
}

export interface ModifyConfigDashboardAppPayload {
  appId: string
  config: Partial<DashboardAppConfig>
}
