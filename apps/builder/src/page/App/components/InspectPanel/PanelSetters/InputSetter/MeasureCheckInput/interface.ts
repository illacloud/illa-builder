import { ReactNode } from "react"

export interface MeasureCheckInputSetterProps {
  value: string
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  attrName: string
  labelName?: string
  labelDesc?: string
  size?: "medium" | "small"
  icon?: ReactNode
}
