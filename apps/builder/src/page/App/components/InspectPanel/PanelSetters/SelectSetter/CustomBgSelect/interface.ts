import { BaseSetter } from "../../interface"

export interface ShadowSelectProps extends BaseSetter {
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  value: string
  useCustomLayout?: boolean
}
