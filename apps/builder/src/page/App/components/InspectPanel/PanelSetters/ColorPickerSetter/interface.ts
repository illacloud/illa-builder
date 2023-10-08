export interface ColorPickerSetterProps {
  value: string
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  attrName: string
  labelName?: string
  labelDesc?: string
  labelSize?: "medium" | "small"
}
