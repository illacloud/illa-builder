import i18n from "i18next"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const DATA_GRID_BUTTON_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.click",
      ),
      value: "click",
    },
  ],
  methods: [],
}

export const DATA_GRID_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onSortModelChange",
      ),
      value: "onSortModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onPaginationModelChange",
      ),
      value: "onPaginationModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onRefresh",
      ),
      value: "onRefresh",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onFilterModelChange",
      ),
      value: "onFilterModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onRowSelectionModelChange",
      ),
      value: "onRowSelectionModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onColumnVisibilityModelChange",
      ),
      value: "onColumnVisibilityModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onRowClick",
      ),
      value: "onRowClick",
    },
  ],
  methods: [
    "setFilterModel",
    "setColumnVisibilityModel",
    "setPage",
    "setPageSize",
    "setRowSelection",
  ],
}
