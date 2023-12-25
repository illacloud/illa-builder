import { SelectOptionObject, SelectValue } from "@illa-design/react"
import { BaseSetter } from "../../interface"

export interface MeasureSelectSetter extends BaseSetter {
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  value: SelectValue
  defaultValue?: SelectValue
  useCustomLayout?: boolean
  options?: SelectOptionObject[]
}
