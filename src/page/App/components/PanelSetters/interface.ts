export interface BaseSetter {
  isFullWidth?: boolean
  defaultValue?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
}
