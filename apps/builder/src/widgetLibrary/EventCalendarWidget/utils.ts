import dayjs from "dayjs"
import { View } from "react-big-calendar"
import i18n from "@/i18n/config"
import {
  Event,
  Pluralize,
  ResourceMap,
} from "@/widgetLibrary/EventCalendarWidget/interface"

export const isInWeekOrDay = (view: View) => view === "week" || view === "day"
export const formatDateTime = "YYYY-MM-DD HH:mm"

export const formatEventOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: (Event & ResourceMap)[] = [],
  mappedOption: Pluralize<Event & ResourceMap> = {
    titles: [],
    ids: [],
    starts: [],
    ends: [],
    resourceIDs: [],
    descriptions: [],
    resourceTitles: [],
    allDays: [],
  },
) => {
  if (optionConfigureMode === "dynamic") {
    const title = mappedOption.titles ?? []
    const id = mappedOption.values ?? []
    const start = mappedOption.starts ?? []
    const end = mappedOption.ends ?? []
    const resourceID = mappedOption.resourceIDs ?? []
    const description = mappedOption.descriptions ?? []
    const resourceTitle = mappedOption.resourceTitles ?? []
    const allDay = mappedOption.allDays ?? []
    const draggable = mappedOption.draggables ?? []
    const resizable = mappedOption.resizables ?? []
    const maxLength = Math.max(
      title.length,
      id.length,
      start.length,
      end.length,
      resourceID.length,
      description.length,
      resourceTitle.length,
      allDay.length,
      resizable.length,
      draggable.length,
    )
    const eventList: Event[] = []
    const resourceMap = new Map()
    for (let i = 0; i < maxLength; i++) {
      const idItem = id[i] || `Event-${i + 1}`
      const titleItem =
        title[i] ||
        i18n.t("editor.inspect.setter_content.eventCalendar.no_title")
      const startItem = start[i] || undefined
      const endItem = end[i] || undefined
      const resourceIDItem = resourceID[i] || ""
      const resourceIDTitleItem = resourceTitle[i]
      const descriptionItem = description[i] || ""
      const allDayItem = allDay[i] ?? false
      const resizableItem = resizable[i] ?? true
      const draggableItem = draggable[i] ?? true
      resourceIDTitleItem &&
        resourceMap.set(
          safeNodeValue(resourceIDItem),
          safeNodeValue(resourceIDTitleItem),
        )
      idItem &&
        eventList.push({
          label: safeNodeValue(titleItem),
          title: safeNodeValue(titleItem),
          id: safeNodeValue(idItem),
          start: getSafeDate(startItem),
          end: getSafeDate(endItem),
          resourceID: safeNodeValue(resourceIDItem),
          resourceTitle: safeNodeValue(resourceIDTitleItem),
          description: safeNodeValue(descriptionItem),
          allDay: allDayItem,
          draggable: draggableItem,
          resizable: resizableItem,
        })
    }
    return [
      eventList,
      Array.from(resourceMap, ([resourceID, resourceTitle]) => ({
        resourceID,
        resourceTitle,
      })),
    ]
  } else {
    if (!Array.isArray(manualOptions)) {
      return []
    }
    const eventList: Event[] = []
    const resourceMap = new Map()
    manualOptions.forEach((option, i) => {
      const idItem = option.value || `Event-${i + 1}`
      const titleItem =
        option.title ||
        i18n.t("editor.inspect.setter_content.eventCalendar.no_title")
      const startItem = option.start || undefined
      const endItem = option.end || undefined
      const resourceIDItem = option.resourceID || `Resource-${i + 1}`
      const descriptionItem = option.description || `Event-${i + 1}`
      const resourceIDTitleItem = option.resourceTitle || `Resource-${i + 1}`
      const allDayItem = option.allDay ?? false
      const draggableItem = option.draggable ?? true
      const resizableItem = option.resizable ?? true
      resourceIDTitleItem &&
        resourceMap.set(
          safeNodeValue(resourceIDItem),
          safeNodeValue(resourceIDTitleItem),
        )
      idItem &&
        eventList.push({
          label: safeNodeValue(titleItem),
          title: safeNodeValue(titleItem),
          id: safeNodeValue(idItem),
          start: getSafeDate(startItem),
          end: getSafeDate(endItem),
          resourceID: safeNodeValue(resourceIDItem),
          resourceTitle: safeNodeValue(resourceIDTitleItem),
          description: safeNodeValue(descriptionItem),
          allDay: allDayItem,
          draggable: draggableItem,
          resizable: resizableItem,
        })
    })
    return [
      eventList,
      Array.from(resourceMap, ([resourceID, resourceTitle]) => ({
        resourceID,
        resourceTitle,
      })),
    ]
  }
}

export const format2EventList = (eventList: Event[]) => {
  if (!eventList) return []
  return eventList.map((item) => {
    return {
      ...item,
      start: dayjs(item.start).format(formatDateTime),
      end: dayjs(item.end).format(formatDateTime),
    }
  })
}

export const eventList2Date = (eventList: Event[]) => {
  if (!eventList) return []
  return eventList.map((item) => {
    return {
      ...item,
      start: item.start ? new Date(item.start) : new Date(),
      end: item.end ? new Date(item.end) : new Date(),
    }
  })
}

export const isLightColor = (color: string): boolean => {
  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/
  const hslRegex =
    /^hsla?\(\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*(,\s*(0?\.\d+|[01]))?\s*\)$/i
  const hexMatch = color.match(hexRegex)
  const hslMatch = color.match(hslRegex)
  const rWeights = 0.299,
    gWeights = 0.587,
    bWeights = 0.114,
    fullRGB = 255,
    critical = 0.5,
    fullH = 360

  if (hexMatch) {
    const hex = hexMatch[1]
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16)
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16)
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16)
    const luminance = (rWeights * r + gWeights * g + bWeights * b) / fullRGB
    return luminance >= critical
  } else if (hslMatch) {
    const h = parseInt(hslMatch[1])
    const s = parseInt(hslMatch[2].slice(0, -1)) / 100
    const l = parseInt(hslMatch[3].slice(0, -1)) / 100
    const a = hslMatch[4] ? parseFloat(hslMatch[5]) : 1
    const luminance =
      (rWeights * s + gWeights * l + (bWeights * h) / fullH) * a + (1 - a)
    return luminance >= critical
  } else {
    return false
  }
}

const safeNodeValue = (value: unknown) => {
  return typeof value === "string" ? value : ""
}

export const getSafeDate = (value: string | Date | undefined) => {
  if (value) {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return new Date()
    }
    return date
  }
  return new Date()
}
