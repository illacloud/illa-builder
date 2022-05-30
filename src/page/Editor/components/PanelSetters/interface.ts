export interface BaseSetter {
  isFullWidth?: boolean
  defaultValue?: any
  attrName: string
  componentDsl: any
  tempProps: any
  handleUpdateDsl: (value: Record<string, any>) => void
}
