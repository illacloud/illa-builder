import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface ColumnButtonGroupSetterProps extends BaseSetter {
  value?: GroupButton[]
  childrenSetter?: PanelFieldConfig[]
}

export interface GroupButton {
  id: string
  mappedValue: string
  disabled?: boolean
  colorScheme: string
}
