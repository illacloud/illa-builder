export interface ActionTitleBarProps {
  onResultVisibleChange: (visible: boolean) => void
  openState: boolean
  activeTab: string
  handleChangeTab: (activeKey: string) => void
}
