import { View, stringOrDate } from "react-big-calendar"
import { SwitchProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type Pluralize<T> = {
  [K in keyof T as `${string & K}s`]: T[K][]
}
export interface Event {
  label?: string
  id?: number | string
  title?: string
  start?: Date
  end?: Date
  resourceId?: number | string
  description?: string
  allDay?: boolean
  resourceTitle?: string
}
export interface ResourceMap {
  label?: string
  resourceTitle?: string
  resourceId?: number | string
}
export interface EventInteractionArgs {
  event: Event
  start: stringOrDate
  end: stringOrDate
  isAllDay: boolean
  resourceId?: number | string
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
  moveEvent: (args: EventInteractionArgs) => void
  resizeEvent: (args: EventInteractionArgs) => void
  selectEvent: (args: Event) => void
}

export interface EventCalendarWidgetProps
  extends WrappedEventCalendarProps,
    BaseWidgetProps {
  eventConfigureMode?: "dynamic" | "static"
  manualOptions?: Event[]
  mappedOption?: Pluralize<Event>
  resourceConfigureMode?: "dynamic" | "static"
  resourceManualOptions?: ResourceMap[]
  resourceMappedOption?: Pluralize<ResourceMap>
}
