import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const RADIO_BUTTON_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.change",
      ),
      value: "change",
    },
  ],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
