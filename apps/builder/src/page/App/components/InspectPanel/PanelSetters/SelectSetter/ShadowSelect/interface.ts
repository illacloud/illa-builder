export interface ShadowSelectProps {
  attrName: string
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  labelName?: string
  value: string
  widgetType: string
}
