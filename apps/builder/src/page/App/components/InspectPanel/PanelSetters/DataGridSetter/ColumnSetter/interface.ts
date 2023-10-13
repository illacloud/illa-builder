import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export interface ColumnConfig {
  id: string
}

export interface ColumnListSetterProps extends BaseSetter {
  value: ColumnConfig[]
}
