import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface FormWIdgetProps extends BaseWidgetProps {
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
  handleOnFormInvalid: () => void
  handleOnFormSubmit: () => void
}
