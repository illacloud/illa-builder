export interface ActionTitleBarProps {
  onResultVisibleChange: (visible: boolean) => void
  onResultValueChange: (value: any) => void
  openState: boolean
  activeTab: string
  handleChangeTab: (activeKey: string) => void
}
