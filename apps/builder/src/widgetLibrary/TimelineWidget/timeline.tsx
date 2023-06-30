import { FC, useEffect, useMemo } from "react"
import { Timeline, TimelineItem } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import {
  TimelineWidgetProps,
  WrappedTimelineProps,
} from "@/widgetLibrary/TimelineWidget/interface"

export const WrappedTimeline: FC<WrappedTimelineProps> = (props) => {
  const { items, direction, pending } = props

  const timelineItems = useMemo(() => {
    if (Array.isArray(items)) {
      return items.map(
        (item) =>
          (typeof item === "string" || typeof item === "number") && (
            <TimelineItem key={item}>{item}</TimelineItem>
          ),
      )
    }
    return null
  }, [items])

  return (
    <Timeline direction={direction} pending={pending} h="100%" w="100%">
      {timelineItems}
    </Timeline>
  )
}

WrappedTimeline.displayName = "WrappedTimeline"

export const TimelineWidget: FC<TimelineWidgetProps> = (props) => {
  const {
    items,
    direction,
    pending,
    displayName,
    dynamicHeight = "fixed",
    // TODO: wei
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    updateComponentHeight,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: string) => {
        handleUpdateDsl({ items: value.split(",") })
      },
      clearValue: () => {
        handleUpdateDsl({ items: [] })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    items,
    direction,
    pending,
    displayName,
    updateComponentRuntimeProps,
    handleUpdateDsl,
    deleteComponentRuntimeProps,
  ])

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  return (
    <AutoHeightContainer
      updateComponentHeight={updateComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <WrappedTimeline {...props} />
    </AutoHeightContainer>
  )
}

TimelineWidget.displayName = "TimelineWidget"
export default TimelineWidget
