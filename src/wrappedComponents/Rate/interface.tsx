import { RateProps } from "@illa-design/rate"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"

export interface WrappedRateProps
  extends LabelProps,
    Omit<ValidateMessageProps, "value">,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<RateProps, "allowHalf" | "allowClear" | "disabled"> {
  value?: number
  loading?: boolean
  readOnly?: boolean
  icon?: "star" | "heart"
  maxCount?: RateProps["count"]
  handleUpdateDsl: (value: Record<string, number>) => void
}
