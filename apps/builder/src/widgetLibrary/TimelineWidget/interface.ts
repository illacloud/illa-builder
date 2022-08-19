import { TimelineProps } from "@illa-design/timeline"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTimelineProps
  extends Pick<TimelineProps, "direction" | "pending"> {
  items?: string[]
}

export interface TimelineWidgetProps
  extends WrappedTimelineProps,
    BaseWidgetProps {}
