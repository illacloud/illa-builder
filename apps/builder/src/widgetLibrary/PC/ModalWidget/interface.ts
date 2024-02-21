import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface ModalWidgetProps extends BaseWidgetProps {
  childrenNode: string[]
  showFooter: boolean
  showHeader: boolean
  headerHeight: number
  footerHeight: number
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  unitH: number
  isVisible: boolean
  columnNumber: number
}
