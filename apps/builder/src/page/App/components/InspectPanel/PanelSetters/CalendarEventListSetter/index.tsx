import { FC } from "react"
import i18n from "@/i18n/config"
import OptionListSetter from "@/page/App/components/InspectPanel/PanelSetters/OptionListSetter"
import { CalendarEventsListSetterProps } from "./interface"

const CalendarEventListSetter: FC<CalendarEventsListSetterProps> = (props) => {
  return (
    <OptionListSetter
      headerName={i18n.t("widget.eventCalendar.name.event_calendar")}
      itemName="Event"
      {...props}
    />
  )
}

CalendarEventListSetter.displayName = "CalendarEventListSetter"

export default CalendarEventListSetter
