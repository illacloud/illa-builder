import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const LIST_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.rowSelect",
      ),
      value: "rowSelect",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onPaginationModelChange",
      ),
      value: "pageChange",
    },
  ],
  methods: [],
}
