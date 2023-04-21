import dayjs from "dayjs"
import {
  FC,
  ReactElement,
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
  WrappedEventCalendarProps,
} from "@/widgetLibrary/EventCalendarWidget/interface"
import {
  ApplyCustomStyle,
  applyEventStyle,
} from "@/widgetLibrary/EventCalendarWidget/style"
import { useElementSize } from "@/widgetLibrary/EventCalendarWidget/useElementSize"
import {
  eventList2Date,
  format2EventList,
  formatDateTime,
  formatEventOptions,
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

export const WrappedEventCalendar: FC<WrappedEventCalendarProps> = (props) => {
  const {
    eventList,
    resourceMapList,
    showResource = false,
    showCurrentTime = true,
    defaultView = "month",
    slotBackground = "white",
    titleColor = "gray",
    eventBackground = "blue",
    eventTextColor = "blue",
    defaultDate,
    moveEvent,
    resizeEvent,
    selectEvent,
  } = props

  const [view, setView] = useState<View>(defaultView)
  const { indicatorTop, currentTime, isLight } = useElementSize(
    view,
    slotBackground,
  )

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DragAndDropCalendar
        defaultDate={defaultDate}
        events={eventList2Date(eventList)}
        localizer={localizer}
        defaultView={defaultView}
        onView={(v) => setView(v)}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        resourceIdAccessor={(resource: Event) => resource.resourceId}
        resources={
          showResource && resourceMapList?.length ? resourceMapList : undefined
        }
        resourceTitleAccessor={(resource: Event) => resource.resourceTitle}
        selectable
        onSelectEvent={(ev) => selectEvent(ev)}
        showMultiDayTimes={false}
        components={{ event: CustomEvent }}
        css={ApplyCustomStyle(
          dayjs(currentTime).format("HH:mm"),
          indicatorTop,
          showCurrentTime,
          slotBackground,
          titleColor,
          eventBackground,
          eventTextColor,
          isLight,
        )}
      />
    </div>
  )
}

WrappedEventCalendar.displayName = "WrappedEventCalendar"

export const EventCalendarWidget: FC<EventCalendarWidgetProps> = (props) => {
  const {
    eventConfigureMode,
    manualOptions,
    eventList,
    defaultDate = new Date(),
    mappedOption,
    resourceMapList,
    handleUpdateMultiExecutionResult,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
    triggerEventHandler,
  } = props

  const currentDefaultDate = useMemo(() => new Date(defaultDate), [defaultDate])

  const [finalEventOptions, finalResourceOptions] = useMemo(() => {
    return formatEventOptions(eventConfigureMode, manualOptions, mappedOption)
  }, [eventConfigureMode, manualOptions, mappedOption])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      addEvent: (event: Event) => {
        if (
          !event ||
          typeof event !== "object" ||
          !event.title ||
          !event.start ||
          !event.end ||
          !event.id
        )
          return
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
        const deleteEventValue = eventList.find((item) => item.id === eventId)
        if (!deleteEventValue) return
        const eventItems = eventList.filter((item) => item.id !== eventId)
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
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    eventList,
    handleUpdateMultiExecutionResult,
  ])

  useEffect(() => {
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          eventList: format2EventList(finalEventOptions),
          resourceMapList: finalResourceOptions,
        },
      },
    ])
  }, [
    displayName,
    finalEventOptions,
    finalResourceOptions,
    handleUpdateMultiExecutionResult,
  ])

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
        triggerEventHandler("change")
      })
    },
    [
      displayName,
      eventList,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
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
        triggerEventHandler("change")
      })
    },
    [
      displayName,
      eventList,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
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
        triggerEventHandler("select")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )

  return (
    <WrappedEventCalendar
      {...props}
      eventList={eventList}
      resourceMapList={resourceMapList}
      moveEvent={moveEvent}
      selectEvent={selectEvent}
      resizeEvent={resizeEvent}
      defaultDate={currentDefaultDate}
    />
  )
}
EventCalendarWidget.displayName = "EventCalendarWidget"
