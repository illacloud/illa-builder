import { forwardRef, useMemo, FC, useEffect } from "react"
import { Timeline, TimelineItem } from "@illa-design/timeline"
import {
  WrappedTimelineProps,
  TimelineWidgetProps,
} from "@/widgetLibrary/TimelineWidget/interface"

export const WrappedTimeline = forwardRef<any, WrappedTimelineProps>(
  (props, ref) => {
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
        return items.map((item) => (
          <TimelineItem key={item}>{item}</TimelineItem>
        ))
      }
      return null
    }, [items])

    return (
      <Timeline direction={direction} pending={pending} h="100%" w="100%">
        {timelineItems}
      </Timeline>
    )
  },
)

WrappedTimeline.displayName = "WrappedTimeline"

export const TimelineWidget: FC<TimelineWidgetProps> = (props) => {
  const {
    items,
    direction,
    pending,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      items,
      direction,
      pending,
      setValue: (value: string) => {
        handleUpdateDsl({ items: value.split(",") })
      },
      clearValue: () => {
        handleUpdateDsl({ items: [] })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    items,
    direction,
    pending,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return <WrappedTimeline {...props} />
}

TimelineWidget.displayName = "TimelineWidget"
