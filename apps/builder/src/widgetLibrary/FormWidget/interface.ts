import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
export interface FormWIdgetProps {
  childrenNode: ComponentNode[]
  showFooter: boolean
  showHeader: boolean
  headerHeight: number
  footerHeight: number
  handleUpdateDsl: (value: Record<string, any>) => void
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  unitH: number
}
