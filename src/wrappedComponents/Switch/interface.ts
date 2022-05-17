import LabelProps from "../Label/interface"
import { SwitchColorScheme } from "@illa-design/switch"

export interface SwitchProps extends LabelProps {
  value: boolean
  defaultValue: boolean
  disabled: boolean
  required: boolean
  checkedBackgroundColor: SwitchColorScheme
  tooltipText: string
  onChange: (value: boolean) => void
}
