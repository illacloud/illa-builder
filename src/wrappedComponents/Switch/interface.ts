import LabelProps from "@/wrappedComponents/Label/interface"
import { SwitchColorScheme } from "@illa-design/switch"

export interface SwitchProps extends LabelProps {
  value: boolean
  defaultValue: boolean
  disabled: boolean
  required: boolean
  checkedBackgroundColor: SwitchColorScheme
  tooltipText: string
  handleUpdateDsl: (value: Record<string, boolean>) => void
}
