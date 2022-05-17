import { PanelLabelProps } from "@/page/Editor/components/InspectPanel/interface"

export interface RadioGroupProps extends PanelLabelProps {
  isDouble?: boolean
  handleChange: (value: any) => void
  defaultValue?: any
  options: any
  canCustom?: boolean
}
