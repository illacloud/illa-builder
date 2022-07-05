export interface DashboardItemMenuProps {
  appId: string
  appIndex: number
  showRenameModal: () => void
  showDuplicateModal: () => void
  setCurrentAppIdx: (idx: number) => void
}

export interface DashboardResourcesItemMenuProps {
  resourceId: string
  showFormVisible: () => void
  setCurId: (curResourceId: string) => void
  editActionType: () => void
}
