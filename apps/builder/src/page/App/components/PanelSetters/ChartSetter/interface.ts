import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"
import { BaseSelectSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface ChartDataSourceSetterProps
  extends BaseSetter,
    PanelLabelProps {
  allowClear?: boolean
}

export interface ChartColorSelectSetterProps extends BaseSetter {}

export interface ChartTypeSelectSetterProps extends BaseSelectSetterProps {}
