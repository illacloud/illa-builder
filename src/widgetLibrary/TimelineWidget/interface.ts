import { TimelineProps } from "@illa-design/timeline"

export interface WrappedTimelineProps
  extends Pick<TimelineProps, "direction" | "pending"> {
  items?: string[]
}
