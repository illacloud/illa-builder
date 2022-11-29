import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const TABLE_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.sortingChange",
      ),
      value: "sortingChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.paginationChange",
      ),
      value: "paginationChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.columnFiltersChange",
      ),
      value: "columnFiltersChange",
    },
  ],
  methods: [],
}

export const TABLE_BUTTON_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.clickMenuItem",
      ),
      value: "clickMenuItem",
    },
  ],
  methods: [],
}
