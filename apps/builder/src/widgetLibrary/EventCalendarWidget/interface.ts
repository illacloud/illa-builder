import { SlotInfo, View, stringOrDate } from "react-big-calendar"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type Pluralize<T> = {
  [K in keyof T as `${string & K}s`]: T[K][]
}

export type CssAttribute = string | number | undefined
export interface Event {
  label?: string
  title?: string
  id?: number | string
  value?: string
  start?: Date
  end?: Date
  resourceID?: number | string
  description?: string
  allDay?: boolean
  resourceTitle?: string
  draggable?: boolean
  resizable?: boolean
}
export interface ResourceMap {
  resourceTitle?: string
  resourceID?: number | string
}
export interface EventInteractionArgs {
  event: Event
  start: stringOrDate
  end: stringOrDate
  isAllDay: boolean
  resourceID?: number | string
}

export interface WrappedEventCalendarProps {
  eventList: Event[]
  resourceMapList: ResourceMap[]
  defaultDate?: Date
  showResource?: boolean
  showCurrentTime?: boolean
  defaultView?: View
  slotBackground?: string
  titleColor?: string
  eventBackground?: string
  eventTextColor?: string
  displayName: string
  isInEdit: boolean
  moveEvent: (args: EventInteractionArgs) => void
  resizeEvent: (args: EventInteractionArgs) => void
  selectEvent: (args: Event) => void
  onDragStart: () => void
  selectSlot: (e: SlotInfo) => void
}

export interface EventCalendarWidgetProps
  extends WrappedEventCalendarProps,
    BaseWidgetProps {
  eventConfigureMode?: "dynamic" | "static"
  manualOptions?: Event[]
  mappedOption?: Pluralize<Event>
  dragMsg?: string
  resizeMsg?: string
}

export interface CalendarEventOptionsType extends Event {
  id: string
  key?: string
  label?: string
  caption?: string
  tooltip?: string
  hidden?: boolean
}
