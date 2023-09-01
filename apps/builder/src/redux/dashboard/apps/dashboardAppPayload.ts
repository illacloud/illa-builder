import { DashboardApp } from "./dashboardAppState"

export interface AddDashboardAppPayload {
  app: DashboardApp
  index?: number
}

export interface ModifyDashboardAppPublic {
  appId: string
  isPublic: boolean
}

export interface ModifyDashboardAppContribute {
  appId: string
  publishedToMarketplace: boolean
}

export interface ModifyDashboardAppDeployed {
  appId: string
  deployed: boolean
}
