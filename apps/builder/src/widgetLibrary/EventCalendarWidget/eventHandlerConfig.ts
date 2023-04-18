import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const EVENT_CALENDAR_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t("editor.inspect.setter_content.Change"),
      value: "Change",
    },
    {
      label: i18n.t("editor.inspect.setter_content.Select"),
      value: "Select",
    },
  ],
  methods: ["addEvent", "deleteEvent"],
}
