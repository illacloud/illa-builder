import { EventHandlerConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const DATE_TIME_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.change",
      ),
      value: "change",
    },
  ],
  methods: [
    "setValue",
    "clearValue",
    "validate",
    "clearValidation",
    "setDisabled",
  ],
}
