import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const FORM_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.submit",
      ),
      value: "submit",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.invalid",
      ),
      value: "invalid",
    },
  ],
  methods: ["submit", "reset", "setValue", "validate"],
}
