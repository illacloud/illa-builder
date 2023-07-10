import { DashboardApp, DashboardAppConfig } from "./dashboardAppState"

export interface AddDashboardAppPayload {
  app: DashboardApp
  index?: number
}

export interface ModifyConfigDashboardAppPayload {
  appId: string
  config: Partial<DashboardAppConfig>
}
