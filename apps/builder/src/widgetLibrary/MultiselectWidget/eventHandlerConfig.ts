import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MULTISELECT_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
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
  methods: ["setSelectedValue", "clearValue", "validate", "clearValidation"],
}
