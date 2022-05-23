export interface BaseSetter {
  isFullWidth?: boolean
  defaultValue?: string
  attrName: string
  componentDsl: any
  tempProps: any
  handleUpdateDsl: (value: Record<string, any>) => void
}
