import dayjs from "dayjs"
import { v4 } from "uuid"
import { ReactComponent as EventCalendarWidgetIcon } from "@/assets/widgetCover/eventCalendar.svg"
import i18n from "@/i18n/config"
import { formatDateTime } from "@/widgetLibrary/EventCalendarWidget/utils"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const date = new Date(),
  fullYear = date.getFullYear(),
  month = date.getMonth(),
  day = date.getDate(),
  hour = date.getHours(),
  minus = date.getMinutes(),
  emptyEvent = {
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
    resourceId: "",
    resourceTitle: "",
    allDay: false,
  }

export const EVENT_CALENDAR_WIDGET_CONFIG: WidgetConfig = {
  displayName: "eventCalendar",
  widgetName: i18n.t("widget.eventCalendar.name.event_calendar"),
  h: 55,
  w: 45,
  type: "EVENT_CALENDAR_WIDGET",
  icon: <EventCalendarWidgetIcon />,
  keywords: ["EventCalendar", "活动日历"],
  sessionType: "CALENDAR",
  resizeDirection: RESIZE_DIRECTION.ALL,
  defaults: {
    eventConfigureMode: "static",
    manualOptions: [
      {
        id: `event-${v4()}`,
        label: "Event 1",
        title: "Event 1",
        value: "Event 1",
        description: "",
        start: dayjs(new Date(fullYear, month, day - 1, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day - 1, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource 1",
        resourceTitle: "Resource 1",
        allDay: undefined,
      },
      {
        id: `event-${v4()}`,
        title: "Event 2",
        label: "Event 2",
        value: "Event 2",
        description: "",
        start: dayjs(new Date(fullYear, month, day, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource 2",
        resourceTitle: "Resource 2",
        allDay: undefined,
      },
      {
        id: `event-${v4()}`,
        title: "Event 3",
        label: "Event 3",
        value: "Event 3",
        description: "",
        start: dayjs(new Date(fullYear, month, day + 1, hour, minus)).format(
          formatDateTime,
        ),
        end: dayjs(new Date(fullYear, month, day + 1, hour + 2, minus)).format(
          formatDateTime,
        ),
        resourceId: "Resource 3",
        resourceTitle: "Resource 3",
        allDay: undefined,
      },
    ],
    resourceMapList: [
      {
        resourceId: "Resource 1",
        resourceTitle: "Resource 1",
      },
      {
        resourceId: "Resource 2",
        resourceTitle: "Resource 2",
      },
      {
        resourceId: "Resource 3",
        resourceTitle: "Resource 3",
      },
    ],
    dataSources: "{{[]}}",
    defaultView: "month",
    defaultDate: dayjs(date).format("YYYY-MM-DD"),
    showResource: false,
    showCurrentTime: "{{true}}",
    slotBackground: "white",
    titleColor: "gray",
    eventBackground: "blue",
    eventTextColor: "blue",
    borderColor: "gray",
    hidden: false,
    addEventValue: emptyEvent,
    deleteEventValue: emptyEvent,
    selectEventValue: emptyEvent,
    changeEventValue: emptyEvent,
  },
}
