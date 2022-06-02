export interface BaseSetter {
  isFullWidth?: boolean
  defaultValue?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdatePanelConfig: (value: Record<string, any>) => void
  handleUpdateItem?: (value: { [attr: string]: any }) => void // just valid in popPanel
}
