import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { CalendarEventOptionsType } from "@/widgetLibrary/EventCalendarWidget/interface"

export interface CalendarEventsListSetterProps extends BaseSetter {
  value: CalendarEventOptionsType[]
  childrenSetter?: PanelFieldConfig[]
}
