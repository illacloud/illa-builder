import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const CODE_SCANNER_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.scanSuccessful",
      ),
      value: "scanSuccessful",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.openScanner",
      ),
      value: "openScanner",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.closeScanner",
      ),
      value: "closeScanner",
    },
  ],
  methods: ["clearValue", "openScanner"],
}
