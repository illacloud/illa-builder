import { FC } from "react"
import i18n from "@/i18n/config"
import OptionListSetter from "@/page/App/components/PanelSetters/OptionListSetter"
import { CalendarEventsListSetterProps } from "@/page/App/components/PanelSetters/OptionListSetter/CalendarEventListSetter/interface"
import { emptyEmptyBodyStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"

const CalendarEventListSetter: FC<CalendarEventsListSetterProps> = (props) => {
  return (
    <OptionListSetter
      headerName={i18n.t("widget.eventCalendar.name.event_calendar")}
      itemName="Event"
      emptyNode={<div css={emptyEmptyBodyStyle}>No Events</div>}
      {...props}
    />
  )
}

CalendarEventListSetter.displayName = "CalendarEventListSetter"

export default CalendarEventListSetter
