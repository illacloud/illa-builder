export interface ToolbarProps {
  columnSetting?: boolean
  refreshSetting?: boolean
  quickFilterSetting?: boolean
  exportSetting?: boolean
  exportAllSetting?: boolean
  filterSetting?: boolean
  densitySetting?: boolean
  onRefresh: () => void
}
