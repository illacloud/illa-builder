import { BaseSelectSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/interface"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export interface ChartDataSourceSetterProps
  extends BaseSetter,
    PanelLabelProps {
  allowClear?: boolean
  value: string
}

export interface ChartColorSelectSetterProps extends BaseSetter {
  value: string
}

export interface ChartTypeSelectSetterProps extends BaseSelectSetterProps {}
