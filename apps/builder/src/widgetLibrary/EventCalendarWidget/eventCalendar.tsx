import dayjs from "dayjs"
import {
  ComponentType,
  FC,
  MouseEvent,
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Calendar,
  EventProps,
  EventWrapperProps,
  SlotInfo,
  View,
  dayjsLocalizer,
} from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import {
  Event,
  EventCalendarWidgetProps,
  EventInteractionArgs,
  WrappedEventCalendarProps,
} from "@/widgetLibrary/EventCalendarWidget/interface"
import {
  ApplyCustomStyle,
  applyEventStyle,
  applyEventWrapper,
} from "@/widgetLibrary/EventCalendarWidget/style"
import { useElementSize } from "@/widgetLibrary/EventCalendarWidget/useElementSize"
import {
  eventList2Date,
  format2EventList,
  formatDateTime,
  formatEventOptions,
  getSafeDate,
} from "@/widgetLibrary/EventCalendarWidget/utils"

const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = dayjsLocalizer(dayjs)

const CustomEvent: FC<EventProps<Event>> = ({ event }) => {
  const isInEdit = useSelector(getIsILLAEditMode)
  const message = useMessage()
  const isDrag = useRef(false)

  const onMouseDown = (
    e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
  ) => {
    if (isInEdit) {
      e.stopPropagation()
      isDrag.current = true
    }
  }
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isInEdit && isDrag.current) {
      e.stopPropagation()
      isDrag.current = true
      message.info({
        content: i18n.t(
          "editor.inspect.setter_tips.eventCalendar.couldnot_drag",
        ),
      })
      isDrag.current = false
    }
  }
  const onMouseUp = (e: MouseEvent<HTMLElement>) => {
    if (isInEdit) {
      e.stopPropagation()
      isDrag.current = false
    }
  }

  const handleMove = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    if (isInEdit) {
      e.stopPropagation()
      onMouseDown(e)
    }
  }

  return (
    <div
      css={applyEventStyle}
      onMouseDownCapture={handleMove}
      onTouchStartCapture={handleMove}
      onMouseMoveCapture={onMouseMove}
      onMouseUpCapture={onMouseUp}
    >
      <p>{event.title}</p>
      <span>{event.description}</span>
    </div>
  )
}

const CustomEventWrapper: FC<
  EventWrapperProps<Event> & { children: ReactNode }
> = ({ children }) => {
  return <div css={applyEventWrapper}>{children}</div>
}

export const WrappedEventCalendar: FC<WrappedEventCalendarProps> = (props) => {
  const {
    eventList,
    resourceMapList,
    showResource = false,
    showCurrentTime,
    defaultView = "month",
    slotBackground = "white",
    titleColor = "gray",
    eventBackground = "blue",
    eventTextColor = "blue",
    defaultDate,
    displayName,
    moveEvent,
    resizeEvent,
    selectEvent,
    onDragStart,
    selectSlot,
  } = props

  const [view, setView] = useState<View>(defaultView)

  const { indicatorTop, currentTime, isLight } = useElementSize(
    view,
    slotBackground,
    displayName,
  )
  useEffect(() => {
    if (showResource) {
      if (view !== "week" && view !== "day") {
        setView("day")
      }
    }
  }, [showResource, view])

  return (
    <div
      className={displayName}
      css={ApplyCustomStyle(
        dayjs(currentTime).format("HH:mm"),
        indicatorTop,
        showCurrentTime,
        slotBackground,
        titleColor,
        eventBackground,
        eventTextColor,
        isLight,
        displayName,
        showResource,
        view,
      )}
    >
      <DragAndDropCalendar
        defaultDate={defaultDate}
        events={eventList2Date(eventList)}
        localizer={localizer}
        view={view}
        onView={(v) => setView(v)}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        resourceIdAccessor={(resource: Event) => resource.resourceID}
        resources={
          showResource && resourceMapList?.length ? resourceMapList : undefined
        }
        resourceTitleAccessor={(resource: Event) => resource.resourceTitle}
        selectable
        onSelectEvent={(ev) => selectEvent(ev)}
        onSelectSlot={(ev: SlotInfo) => selectSlot(ev)}
        showMultiDayTimes={false}
        components={{
          event: CustomEvent,
          eventWrapper: CustomEventWrapper as ComponentType<
            EventWrapperProps<object>
          >,
        }}
        onDragStart={onDragStart}
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
    displayName,
    dragMsg,
    resizeMsg,
    triggerEventHandler,
    handleUpdateMultiExecutionResult,
  } = props

  const currentDefaultDate = useMemo(
    () => getSafeDate(defaultDate),
    [defaultDate],
  )

  const isInEdit = useSelector(getIsILLAEditMode)
  const message = useMessage()

  const [finalEventOptions, finalResourceOptions] = useMemo(() => {
    return formatEventOptions(eventConfigureMode, manualOptions, mappedOption)
  }, [eventConfigureMode, manualOptions, mappedOption])

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
      resourceID,
      isAllDay: droppedOnAllDaySlot = false,
    }: EventInteractionArgs) => {
      if (!event.draggable) {
        message.info({
          content:
            dragMsg ??
            i18n.t(
              "editor.inspect.setter_label.eventCalendar.default_message_draggable",
            ),
        })
        return
      }
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
                  resourceID,
                  allDay,
                },
              ],
              changeEventValue: {
                ...existing,
                start: dayjs(start).format(formatDateTime),
                end: dayjs(end).format(formatDateTime),
              },
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
      dragMsg,
      message,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
  )

  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs) => {
      if (!event.resizable) {
        message.info({
          content:
            resizeMsg ??
            i18n.t(
              "editor.inspect.setter_label.eventCalendar.default_message_resizable",
            ),
        })
        return
      }
      const minStep = 180000
      const existing = eventList.find((ev) => ev.id === event.id) ?? {}
      const filtered = eventList.filter((ev) => ev.id !== event.id)
      let startTime = new Date(start).getTime(),
        endTime = new Date(end).getTime()
      if (endTime - startTime < minStep) {
        return
      }
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
              changeEventValue: {
                ...existing,
                start: dayjs(start).format(formatDateTime),
                end: dayjs(end).format(formatDateTime),
              },
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
      resizeMsg,
      message,
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

  const showMessageOnEdit = () => {
    message.info({
      content: i18n.t("editor.inspect.setter_tips.eventCalendar.couldnot_drag"),
    })
  }
  const onDragStart = () => {
    isInEdit && showMessageOnEdit()
  }

  const selectSlot = (e: SlotInfo) => {
    if (isInEdit && e.action === "select") {
      showMessageOnEdit()
      return
    }
    const { start, end } = e
    new Promise((resolve) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            selectStartTime: dayjs(start).format(formatDateTime),
            selectEndTime: dayjs(end).format(formatDateTime),
            selectResource: resourceMapList.find(
              (v) => v.resourceID === e.resourceId,
            ),
          },
        },
      ])
      resolve(true)
    }).then(() => {
      triggerEventHandler("DragOrClickNoEventArea")
    })
  }

  return (
    <WrappedEventCalendar
      {...props}
      eventList={eventList}
      resourceMapList={resourceMapList}
      moveEvent={isInEdit ? showMessageOnEdit : moveEvent}
      selectEvent={selectEvent}
      resizeEvent={isInEdit ? () => {} : resizeEvent}
      defaultDate={currentDefaultDate}
      onDragStart={onDragStart}
      isInEdit={isInEdit}
      selectSlot={selectSlot}
    />
  )
}
EventCalendarWidget.displayName = "EventCalendarWidget"
export default EventCalendarWidget
