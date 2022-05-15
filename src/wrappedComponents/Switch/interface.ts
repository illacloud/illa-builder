import LabelProps from "../Label/interface"

export interface SwitchProps extends LabelProps {
  value: boolean
  disabled: boolean
  required: boolean
  checkedBackgroundColor: string
  tooltipText: string
  onChange: (value: boolean) => void
}
