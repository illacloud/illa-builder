import { TimelineProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTimelineProps
  extends Pick<TimelineProps, "direction" | "pending"> {
  items?: string[]
}

export interface TimelineWidgetProps
  extends WrappedTimelineProps,
    BaseWidgetProps {
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}
