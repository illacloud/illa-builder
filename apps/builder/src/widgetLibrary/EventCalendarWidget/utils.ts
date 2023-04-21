import dayjs from "dayjs"
import { View } from "react-big-calendar"
import {
  Event,
  EventInteractionArgs,
  Pluralize,
  ResourceMap,
} from "@/widgetLibrary/EventCalendarWidget/interface"

export const isInWeekOrDay = (view: View) => view === "week" || view === "day"
export const formatDateTime = "YYYY-MM-DD HH:mm:ss"

export const formatEventOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: Event[] = [],
  mappedOption: Pluralize<Event> = {
    labels: [],
    ids: [],
    titles: [],
    starts: [],
    ends: [],
    resourceIds: [],
    descriptions: [],
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
    const allDay = mappedOption.allDays ?? []
    const maxLength = Math.max(
      label.length,
      id.length,
      title.length,
      start.length,
      end.length,
      resourceId.length,
      description.length,
      allDay.length,
    )
    const options: Event[] = []
    for (let i = 0; i < maxLength; i++) {
      let labelItem = label[i] || `Event-${i + 1}`
      const idItem = id[i] || `Event-${i + 1}`
      const titleItem = title[i] || `Event-${i + 1}`
      const startItem = start[i] || undefined
      const endItem = end[i] || undefined
      const resourceIdItem = resourceId[i] || `Resource-${i + 1}`
      const descriptionItem = description[i] || `Resource-${i + 1}`
      const allDayItem = allDay[i] ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      idItem &&
        options.push({
          label: labelItem,
          id: idItem,
          title: titleItem,
          start: startItem ? new Date(startItem) : new Date(),
          end: endItem ? new Date(endItem) : new Date(),
          resourceId: resourceIdItem,
          description: descriptionItem,
          allDay: allDayItem,
        })
    }
    return options
  } else {
    if (!Array.isArray(manualOptions)) {
      return []
    }
    const options: Event[] = []
    manualOptions.forEach((option, i) => {
      let labelItem = option.label || `Event-${i + 1}`
      const idItem = option.id || `Event-${i + 1}`
      const titleItem = option.title || `Event-${i + 1}`
      const startItem = option.start || undefined
      const endItem = option.end || undefined
      const resourceIdItem = option.resourceId || `Resource-${i + 1}`
      const descriptionItem = option.description || `Resource-${i + 1}`
      const allDayItem = option.allDay ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      idItem &&
        options.push({
          label: labelItem,
          id: idItem,
          title: titleItem,
          start: startItem ? new Date(startItem) : new Date(),
          end: endItem ? new Date(endItem) : new Date(),
          resourceId: resourceIdItem,
          description: descriptionItem,
          allDay: allDayItem,
        })
    })
    return options
  }
}

export const formatResourceOptions = (
  optionConfigureMode: "dynamic" | "static" = "static",
  manualOptions: ResourceMap[] = [],
  mappedOption: Pluralize<ResourceMap> = {
    labels: [],
    resourceTitles: [],
    resourceIds: [],
  },
) => {
  if (optionConfigureMode === "dynamic") {
    const label = mappedOption.labels ?? []
    const resourceId = mappedOption.resourceIds ?? []
    const resourceTitle = mappedOption.resourceTitles ?? []
    const maxLength = Math.max(
      label.length,
      resourceId.length,
      resourceTitle.length,
    )
    const options: Event[] = []
    for (let i = 0; i < maxLength; i++) {
      let labelItem = label[i] || `Resource-${i + 1}`
      const resourceIdItem = resourceId[i] || `Resource-${i + 1}`
      const resourceTitleItem = resourceTitle[i] || `Resource-${i + 1}`
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      options.push({
        label: labelItem,
        resourceId: resourceIdItem,
        resourceTitle: resourceTitleItem,
      })
    }
    return options
  } else {
    if (!Array.isArray(manualOptions)) {
      return []
    }
    const options: ResourceMap[] = []
    manualOptions.forEach((option, i) => {
      let labelItem = option.label || `Resource-${i + 1}`
      const resourceIdItem = option.resourceId || `Resource-${i + 1}`
      const resourceTitleItem = option.resourceTitle || `Resource-${i + 1}`
      if (typeof labelItem === "object") {
        labelItem = `Event-${i + 1}`
      }
      options.push({
        label: labelItem,
        resourceId: resourceIdItem,
        resourceTitle: resourceTitleItem,
      })
    })
    return options
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
