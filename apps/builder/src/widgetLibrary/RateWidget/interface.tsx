import { RateProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRateProps
  extends Pick<
    RateProps,
    "allowHalf" | "allowClear" | "disabled" | "readonly"
  > {
  value?: number
  loading?: boolean
  icon?: "star" | "heart"
  maxCount?: RateProps["count"]
  handleOnChange?: () => void
}

export interface RateWidgetProps
  extends WrappedRateProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    ValidateMessageOldProps {
  validateMessage: string
}
