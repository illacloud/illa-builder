import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const CONTAINER_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.click",
      ),
      value: "click",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.change",
      ),
      value: "change",
    },
  ],
  methods: [
    "setCurrentViewKey",
    "setCurrentViewIndex",
    "showNextView",
    "showNextVisibleView",
    "showPreviousView",
    "showPreviousVisibleView",
  ],
}
