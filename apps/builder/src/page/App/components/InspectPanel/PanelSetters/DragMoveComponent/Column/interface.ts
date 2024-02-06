import { ReactNode } from "react"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface ColumnProps {
  id: string
  label?: string
  showDelete?: boolean
  showCopy?: boolean
  onCopy?: () => void
  showVisible?: boolean
  widgetDisplayName: string
  onVisibilityChange?: (visibility: boolean) => void
  onDelete?: (id: string) => void
  attrPath: string
  visibility?: boolean
  extraElement?: ReactNode
  childrenSetter?: PanelFieldConfig[]
  labelTip?: ReactNode
}
