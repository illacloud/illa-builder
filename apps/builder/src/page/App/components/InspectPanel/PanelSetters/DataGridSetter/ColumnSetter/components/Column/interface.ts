import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface ColumnProps {
  id: string
  label: string
  showDelete?: boolean
  widgetDisplayName: string
  onVisibilityChange: (visibility: boolean) => void
  onDelete: (id: string) => void
  attrPath: string
  visibility?: boolean
  childrenSetter: PanelFieldConfig[]
}
