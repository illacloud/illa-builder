import { RateProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRateProps
  extends Pick<RateProps, "allowHalf" | "allowClear" | "disabled"> {
  value?: number
  loading?: boolean
  readOnly?: boolean
  icon?: "star" | "heart"
  maxCount?: RateProps["count"]
  handleUpdateDsl: (value: any) => void
  handleOnChange?: () => void
}

export interface RateWidgetProps
  extends WrappedRateProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {}
