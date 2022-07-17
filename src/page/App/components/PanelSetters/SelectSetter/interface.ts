import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"

export interface BaseSelectSetterProps extends BaseSetter {
  options?: any
}

export interface ColorSelectSetterProps extends BaseSetter {
  options?: { key: string; value: string }[]
}

export interface DynamicSelectSetterProps
  extends BaseSelectSetterProps,
    PanelLabelProps {}
