import dayjs from "dayjs"
import { ReactComponent as SwitchWidgetIcon } from "@/assets/widgetCover/switch.svg"
import i18n from "@/i18n/config"
import { formatDateTime } from "@/widgetLibrary/EventCalendarWidget/utils"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const date = new Date(),
  fullYear = date.getFullYear(),
  month = date.getMonth(),
  day = date.getDate(),
  hour = date.getHours(),
  minus = date.getMinutes()

export const EVENT_CALENDAR_WIDGET_CONFIG: WidgetConfig = {
  displayName: "eventCalendar",
  widgetName: i18n.t("widget.eventCalendar.name.event_calendar"),
  h: 50,
  w: 45,
  type: "EVENT_CALENDAR_WIDGET",
  icon: <SwitchWidgetIcon />,
  keywords: ["EventCalendar", "活动日历"],
  sessionType: "CALENDAR",
  resizeDirection: RESIZE_DIRECTION.ALL,
  defaults: {
    eventConfigureMode: "static",
    eventList: [
      {
        label: "Event-1",
        id: "Event-1",
        title: "Event-1",
        description: "",
        start: dayjs(new Date(fullYear, month, day - 1, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day - 1, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource-1",
        allDay: undefined,
      },
      {
        label: "Event-2",
        id: "Event-2",
        title: "Event-2",
        description: "",
        start: dayjs(new Date(fullYear, month, day, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource-2",
        allDay: undefined,
      },
      {
        label: "Event-3",
        id: "Event-3",
        title: "Event-3",
        description: "",
        start: dayjs(new Date(fullYear, month, day + 1, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day + 1, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource-3",
        allDay: undefined,
      },
    ],
    resourceConfigureMode: "static",
    resourceMapList: [
      {
        id: "Resource-1",
        label: "Resource-1",
        resourceId: "Resource-1",
        resourceTitle: "Resource-1",
      },
      {
        id: "Resource-2",
        label: "Resource-2",
        resourceId: "Resource-2",
        resourceTitle: "Resource-2",
      },
      {
        id: "Resource-3",
        label: "Resource-3",
        resourceId: "Resource-3",
        resourceTitle: "Resource-3",
      },
    ],
    dataSources: "{{[]}}",
    resourceDataSources: "{{[]}}",
    defaultView: "month",
    defaultDate: dayjs(date).format(formatDateTime),
    showResource: false,
    showCurrentTime: "{{true}}",
    slotBackground: "white",
    titleColor: "gray",
    eventBackground: "blue",
    eventTextColor: "blue",
    hidden: false,
    addEventValue: "{{{}}}",
    deleteEventValue: "{{{}}}",
    selectEventValue: "{{{}}}",
  },
}
