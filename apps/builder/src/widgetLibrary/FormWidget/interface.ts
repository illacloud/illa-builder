import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface FormWidgetProps extends BaseWidgetProps {
  childrenNode: ComponentNode[]
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
  blockColumns: number
  formData?: Record<string, any>
}
