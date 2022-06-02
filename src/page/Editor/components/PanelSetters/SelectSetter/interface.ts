import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"
import { PanelLabelProps } from "@/page/Editor/components/InspectPanel/interface"

export interface BaseSelectSetterProps extends BaseSetter, PanelLabelProps {
  options?: any
  defaultValue?: any
  allowClear?: any
}

export interface ColorSelectSetterProps extends BaseSetter {
  options?: { key: string; value: string }[]
  defaultValue?: string
}

export interface DynamicSwitchProps
  extends BaseSelectSetterProps,
    PanelLabelProps {}
