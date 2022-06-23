export interface DashboardItemMenuProps {
  appId: string
  appName: string
  appIndex: number
}

export interface DashboardResourcesItemMenuProps {
  resourceId: string
  showFormVisible: () => void
  setCurId: (curResourceId: string) => void
}
