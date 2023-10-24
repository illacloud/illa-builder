import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export interface ColumnIconGroupSetterProps extends BaseSetter {
  value: GroupIcon[]
}

export interface GroupIcon {
  id: string
}
