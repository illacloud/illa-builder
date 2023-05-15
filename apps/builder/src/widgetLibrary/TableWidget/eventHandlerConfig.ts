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
        "editor.inspect.setter_content.widget_action_type_name.filtersChange",
      ),
      value: "filtersChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.rowSelectChange",
      ),
      value: "rowSelectChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.rowClick",
      ),
      value: "rowClick",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.refresh",
      ),
      value: "refresh",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onCellSelect",
      ),
      value: "onCellSelect",
    },
  ],
  methods: [
    "selectPage",
    "selectRow",
    "clearSelection",
    "setFilters",
    "clearFilters",
    "setSort",
  ],
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
