import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedDateProps extends LabelProps {
  value?: number
  tooltipText?: string
  showText?: boolean
  color?: string
  trailColor?: string
  strokeWidth?: string
}
