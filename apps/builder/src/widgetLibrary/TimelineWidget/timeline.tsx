import { FC, forwardRef, useEffect, useMemo } from "react"
import { Timeline, TimelineItem } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import {
  TimelineWidgetProps,
  WrappedTimelineProps,
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
    dynamicHeight = "fixed",
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
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
