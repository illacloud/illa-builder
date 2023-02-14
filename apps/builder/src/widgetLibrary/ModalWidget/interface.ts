import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface ModalWidgetProps extends BaseWidgetProps {
  childrenNode: ComponentNode[]
  showFooter: boolean
  showHeader: boolean
  headerHeight: number
  footerHeight: number
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  unitH: number
  isVisible: boolean
  blockColumns: number
}
