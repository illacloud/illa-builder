import { EventHandlerConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const EDITABLE_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.change",
      ),
      value: "change",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.focus",
      ),
      value: "focus",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.blur",
      ),
      value: "blur",
    },
  ],
  methods: ["setValue", "clearValue", "focus", "validate", "clearValidation"],
}
