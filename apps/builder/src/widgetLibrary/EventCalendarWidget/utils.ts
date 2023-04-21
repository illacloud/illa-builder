import dayjs from "dayjs"
import { View } from "react-big-calendar"
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
    labels: [],
    ids: [],
    titles: [],
    starts: [],
    ends: [],
    resourceIds: [],
    descriptions: [],
    resourceTitles: [],
    allDays: [],
  },
) => {
  if (optionConfigureMode === "dynamic") {
    const label = mappedOption.labels ?? []
    const id = mappedOption.ids ?? []
    const title = mappedOption.titles ?? []
    const start = mappedOption.starts ?? []
    const end = mappedOption.ends ?? []
    const resourceId = mappedOption.resourceIds ?? []
    const description = mappedOption.descriptions ?? []
    const resourceTitle = mappedOption.resourceTitles ?? []
    const allDay = mappedOption.allDays ?? []
    const maxLength = Math.max(
      label.length,
      id.length,
      title.length,
      start.length,
      end.length,
      resourceId.length,
      description.length,
      resourceTitle.length,
      allDay.length,
    )
    const eventList: Event[] = []
    const resourceMap = new Map()
    for (let i = 0; i < maxLength; i++) {
      let labelItem = label[i] || `Event-${i + 1}`
      const idItem = id[i] || `Event-${i + 1}`
      const titleItem = title[i] || `Event-${i + 1}`
      const startItem = start[i] || undefined
      const endItem = end[i] || undefined
      const resourceIdItem = resourceId[i] || `Resource-${i + 1}`
      const resourceIdTitleItem = resourceTitle[i]
      const descriptionItem = description[i] || `Resource-${i + 1}`
      const allDayItem = allDay[i] ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      resourceMap.set(
        safeNodeValue(resourceIdItem),
        safeNodeValue(resourceIdTitleItem),
      )
      idItem &&
        eventList.push({
          label: labelItem,
          id: safeNodeValue(idItem),
          title: safeNodeValue(titleItem),
          start: startItem ? new Date(startItem) : new Date(),
          end: endItem ? new Date(endItem) : new Date(),
          resourceId: safeNodeValue(resourceIdItem),
          resourceTitle: safeNodeValue(resourceIdTitleItem),
          description: safeNodeValue(descriptionItem),
          allDay: allDayItem,
        })
    }
    return [
      eventList,
      Array.from(resourceMap, ([resourceId, resourceTitle]) => ({
        resourceId,
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
      let labelItem = option.label || `Event-${i + 1}`
      const idItem = option.id || `Event-${i + 1}`
      const titleItem = option.title || `Event-${i + 1}`
      const startItem = option.start || undefined
      const endItem = option.end || undefined
      const resourceIdItem = option.resourceId || `Resource-${i + 1}`
      const descriptionItem = option.description || `Resource-${i + 1}`
      const resourceIdTitleItem = option.resourceTitle || `Resource-${i + 1}`
      const allDayItem = option.allDay ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      resourceMap.set(
        safeNodeValue(resourceIdItem),
        safeNodeValue(resourceIdTitleItem),
      )
      idItem &&
        eventList.push({
          label: labelItem,
          id: safeNodeValue(idItem),
          title: safeNodeValue(titleItem),
          start: startItem ? new Date(startItem) : new Date(),
          end: endItem ? new Date(endItem) : new Date(),
          resourceId: safeNodeValue(resourceIdItem),
          resourceTitle: safeNodeValue(resourceIdTitleItem),
          description: safeNodeValue(descriptionItem),
          allDay: allDayItem,
        })
    })
    return [
      eventList,
      Array.from(resourceMap, ([resourceId, resourceTitle]) => ({
        resourceId,
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
