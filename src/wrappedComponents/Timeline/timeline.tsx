import { Timeline, TimelineItem } from "@illa-design/timeline"
import { FC, useMemo } from "react"
import { WrappedTimelineProps } from "@/wrappedComponents/Timeline/interface"

export const WrappedTimeline: FC<WrappedTimelineProps> = (props) => {
  const {
    items = [
      "The first milestone",
      "The second milestone",
      "The third milestone",
    ],
    direction,
    pending,
  } = props

  const timelineItems = useMemo(() => {
    if (Array.isArray(items)) {
      return items.map((item) => <TimelineItem key={item}>{item}</TimelineItem>)
    }
    return null
  }, [items])

  return (
    <Timeline direction={direction} pending={pending}>
      {timelineItems}
    </Timeline>
  )
}

WrappedTimeline.displayName = "WrappedTimeline"

export const TimelineWidget = WrappedTimeline
