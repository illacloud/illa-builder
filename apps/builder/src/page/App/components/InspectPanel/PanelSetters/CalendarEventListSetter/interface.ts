import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { CalendarEventOptionsType } from "@/widgetLibrary/EventCalendarWidget/interface"

export interface CalendarEventsListSetterProps extends BaseSetter {
  value: CalendarEventOptionsType[]
  childrenSetter?: PanelFieldConfig[]
}
