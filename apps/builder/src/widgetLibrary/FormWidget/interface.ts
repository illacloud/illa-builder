import { PADDING_MODE } from "@illa-public/public-types"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface FormWidgetProps extends BaseWidgetProps {
  showFooter: boolean
  showHeader: boolean
  headerHeight: number
  footerHeight: number
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  unitH: number
  disabled: boolean
  disabledSubmit: boolean
  validateInputsOnSubmit: boolean
  resetAfterSuccessful: boolean
  columnNumber: number
  dynamicHeight: "auto" | "fixed" | "limited"
  formData?: Record<string, any>
  padding?: {
    size: string
    mode: PADDING_MODE
  }
}
