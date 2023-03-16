export interface DashboardItemMenuProps {
  appId: string
  canManageApp?: boolean
  canEditApp: boolean
  isDeploy: boolean
}

export interface DeleteDashboardAppResponse {
  appID: string
}
