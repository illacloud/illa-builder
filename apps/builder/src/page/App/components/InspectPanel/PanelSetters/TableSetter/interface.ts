import { BaseInputSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/interface"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export type SelectOptions = (
  | string
  | number
  | {
      label: string
      value: string | number
    }
)[]

export interface ColumnsSelectSetterProps extends BaseSetter, PanelLabelProps {
  allowClear?: boolean
  value: string
}
export interface TableDataSourceSetterProps
  extends BaseSetter,
    PanelLabelProps {
  allowClear?: boolean
}

export interface TableDataInputSetterProps extends BaseInputSetterProps {}
