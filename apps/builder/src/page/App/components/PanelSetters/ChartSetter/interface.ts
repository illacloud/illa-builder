import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"

export interface ChartDataSourceSetterProps
  extends BaseSetter,
    PanelLabelProps {
  allowClear?: boolean
}

export interface ChartColorSelectSetterProps extends BaseSetter {}
