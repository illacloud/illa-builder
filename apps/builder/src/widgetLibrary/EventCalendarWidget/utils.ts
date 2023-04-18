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
      let labelItem = label[i] || `Event-${i}`
      const idItem = id[i] || `Event-${i}`
      const titleItem = title[i] || `Event-${i}`
      const startItem = start[i] || undefined
      const endItem = end[i] || undefined
      const resourceIdItem = resourceId[i] || `Resource-${i}`
      const descriptionItem = description[i] || `Resource-${i}`
      const allDayItem = allDay[i] ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i}`
      }
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
      let labelItem = option.label || `Event-${i}`
      const idItem = option.id || `Event-${i}`
      const titleItem = option.title || `Event-${i}`
      const startItem = option.start || undefined
      const endItem = option.end || undefined
      const resourceIdItem = option.resourceId || `Resource-${i}`
      const descriptionItem = option.description || `Resource-${i}`
      const allDayItem = option.allDay ?? false
      if (typeof labelItem === "object") {
        labelItem = `Event-${i}`
      }
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
      let labelItem = label[i] || `Resource-${i}`
      const resourceIdItem = resourceId[i] || `Resource-${i}`
      const resourceTitleItem = resourceTitle[i] || `Resource-${i}`
      if (typeof labelItem === "object") {
        labelItem = `Event-${i}`
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
      let labelItem = option.label || `Resource-${i}`
      const resourceIdItem = option.resourceId || `Resource-${i}`
      const resourceTitleItem = option.resourceTitle || `Resource-${i}`
      if (typeof labelItem === "object") {
        labelItem = `Event-${i}`
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
  return eventList.map((item) => {
    return {
      ...item,
      start: dayjs(item.start).format(formatDateTime),
      end: dayjs(item.end).format(formatDateTime),
    }
  })
}
