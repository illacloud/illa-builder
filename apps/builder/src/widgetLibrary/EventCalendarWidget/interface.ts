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

export interface WrappedEventCalendarProps extends BaseWidgetProps {
  eventList: Event[]
  resourceMapList: ResourceMap[]
  eventConfigureMode?: "dynamic" | "static"
  manualOptions?: Event[]
  mappedOption?: Pluralize<Event>
  resourceConfigureMode?: "dynamic" | "static"
  resourceManualOptions?: ResourceMap[]
  resourceMappedOption?: Pluralize<ResourceMap>
  defaultDate?: string
  showResource?: boolean
  showCurrentTime?: boolean
  defaultView?: View
  slotBackground?: string
  titleColor?: string
  eventBackground?: string
  eventTextColor?: string
  borderColor?: string
  handleOnChange: () => void
  handleOnSelect: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface EventCalendarWidgetProps extends WrappedEventCalendarProps {
  // handleUpdateDsl: (value: Record<string, boolean | undefined>) => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}
