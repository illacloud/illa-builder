import dayjs from "dayjs"
import {
  FC,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Calendar, EventProps, View, dayjsLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import {
  Event,
  EventCalendarWidgetProps,
  EventInteractionArgs,
  ResourceMap,
  WrappedEventCalendarProps,
} from "@/widgetLibrary/EventCalendarWidget/interface"
import {
  ApplyCustomStyle,
  applyEventStyle,
} from "@/widgetLibrary/EventCalendarWidget/style"
import { useElementSize } from "@/widgetLibrary/EventCalendarWidget/useElementSize"
import {
  format2EventList,
  formatDateTime,
  formatEventOptions,
  formatResourceOptions,
} from "@/widgetLibrary/EventCalendarWidget/utils"

const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = dayjsLocalizer(dayjs)

const CustomEvent: FC<EventProps<Event>> = ({ event }) => {
  return (
    <div css={applyEventStyle}>
      <p>{event.title}</p>
      <span>{event.description}</span>
    </div>
  )
}

export const WrappedEventCalendar = forwardRef<
  ReactElement,
  WrappedEventCalendarProps
>((props) => {
  const {
    handleUpdateMultiExecutionResult,
    handleOnChange,
    handleOnSelect,
    eventList,
    resourceMapList,
    showResource = false,
    showCurrentTime = true,
    defaultView,
    slotBackground = "white",
    titleColor = "gray",
    borderColor = "gray",
    eventBackground,
    eventTextColor,
    defaultDate = "",
    displayName,
  } = props
  const [view, setView] = useState<View>("month")
  const { indicatorTop, contentWidth, currentTime } = useElementSize(
    view,
    showResource,
  )
  const currentDefaultDate = useMemo(() => new Date(defaultDate), [defaultDate])
  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs) => {
      const { allDay } = event
      if (allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      const existing = eventList.find((ev) => ev.id === event.id) ?? {}
      const filtered = eventList.filter((ev) => ev.id !== event.id)
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              eventList: [
                ...format2EventList(filtered),
                {
                  ...existing,
                  start: dayjs(start).format(formatDateTime),
                  end: dayjs(end).format(formatDateTime),
                  resourceId,
                  allDay,
                },
              ],
            },
          },
        ])
        resolve(true)
      }).then(() => {
        handleOnChange?.()
      })
    },
    [displayName, eventList, handleOnChange, handleUpdateMultiExecutionResult],
  )

  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs) => {
      const existing = eventList.find((ev) => ev.id === event.id) ?? {}
      const filtered = eventList.filter((ev) => ev.id !== event.id)
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              eventList: [
                ...format2EventList(filtered),
                {
                  ...existing,
                  start: dayjs(start).format(formatDateTime),
                  end: dayjs(end).format(formatDateTime),
                },
              ],
            },
          },
        ])
        resolve(true)
      }).then(() => {
        handleOnChange?.()
      })
    },
    [displayName, eventList, handleOnChange, handleUpdateMultiExecutionResult],
  )
  const selectEvent = useCallback(
    (event: Event) => {
      const { start, end } = event
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              selectEventValue: {
                ...event,
                start: dayjs(start).format(formatDateTime),
                end: dayjs(end).format(formatDateTime),
              },
            },
          },
        ])
        resolve(true)
      }).then(() => {
        handleOnSelect?.()
      })
    },
    [displayName, handleOnSelect, handleUpdateMultiExecutionResult],
  )
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DragAndDropCalendar
        defaultDate={currentDefaultDate}
        events={eventList}
        localizer={localizer}
        defaultView={defaultView}
        onView={(v) => setView(v)}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        resourceIdAccessor={(resource: Event) => resource.resourceId}
        resources={showResource ? resourceMapList : undefined}
        resourceTitleAccessor={(resource: Event) => resource.resourceTitle}
        selectable
        onSelectEvent={(e) => selectEvent(e)}
        showMultiDayTimes={false}
        components={{ event: CustomEvent }}
        css={ApplyCustomStyle(
          dayjs(currentTime).format("HH:mm"),
          indicatorTop,
          contentWidth,
          showCurrentTime,
          slotBackground,
          titleColor,
          borderColor,
          showResource,
        )}
      />
    </div>
  )
})

WrappedEventCalendar.displayName = "WrappedEventCalendar"

export const EventCalendarWidget: FC<EventCalendarWidgetProps> = (props) => {
  const {
    eventConfigureMode,
    resourceConfigureMode,
    eventList,
    mappedOption,
    resourceMapList,
    resourceMappedOption,
    handleUpdateMultiExecutionResult,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
    displayName,
    triggerEventHandler,
  } = props

  const finalEventOptions = useMemo(() => {
    return formatEventOptions(eventConfigureMode, eventList, mappedOption)
  }, [eventConfigureMode, eventList, mappedOption])

  const finalResourceOptions = useMemo(() => {
    return formatResourceOptions(
      resourceConfigureMode,
      resourceMapList,
      resourceMappedOption,
    )
  }, [resourceConfigureMode, resourceMapList, resourceMappedOption])

  useEffect(() => {
    updateComponentRuntimeProps?.({
      addEvent: (event: Event) => {
        const eventItems = eventList.filter((item) => item.id !== event.id)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              eventList: [...eventItems, event],
              addEventValue: event,
            },
          },
        ])
      },
      deleteEvent: (eventId: string | number) => {
        const eventItems = eventList.filter((item) => item.id !== eventId),
          deleteEventValue = eventList.find((item) => item.id === eventId)
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              eventList: eventItems,
              deleteEventValue,
            },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    displayName,
    eventList,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  ])

  const handleOnChange = useCallback(() => {
    triggerEventHandler("change")
  }, [triggerEventHandler])

  const handleOnSelect = useCallback(() => {
    triggerEventHandler("select")
  }, [triggerEventHandler])

  return (
    <WrappedEventCalendar
      {...props}
      handleOnChange={handleOnChange}
      handleOnSelect={handleOnSelect}
      eventList={finalEventOptions}
      resourceMapList={finalResourceOptions}
    />
  )
}
EventCalendarWidget.displayName = "EventCalendarWidget"
