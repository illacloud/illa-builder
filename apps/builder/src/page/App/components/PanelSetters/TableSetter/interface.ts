import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"
import { BaseInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

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
