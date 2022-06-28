import { RateProps } from "@illa-design/rate"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

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
