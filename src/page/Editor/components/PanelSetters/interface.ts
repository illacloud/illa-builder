export interface BaseSetter {
  isFullWidth?: boolean
  defaultValue?: any
  attrName: string
  panelConfig: Record<string, any>
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdateConfigPanel: (value: Record<string, any>) => void
}
