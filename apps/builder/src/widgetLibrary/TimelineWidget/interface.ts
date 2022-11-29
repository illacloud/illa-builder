import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TimelineProps } from "@illa-design/react"

export interface WrappedTimelineProps
  extends Pick<TimelineProps, "direction" | "pending"> {
  items?: string[]
}

export interface TimelineWidgetProps
  extends WrappedTimelineProps,
    BaseWidgetProps {}
