import { PanelLabelProps } from "@/page/Editor/components/InspectPanel/interface"

export interface SwitchSetterProps extends PanelLabelProps {
  canCustom?: boolean
  defaultValue?: boolean
  handleChange?: (value: boolean) => void
}
