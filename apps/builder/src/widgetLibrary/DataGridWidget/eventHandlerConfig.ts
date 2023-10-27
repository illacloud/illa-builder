import i18n from "i18next"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const DATA_GRID_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.sortingChange",
      ),
      value: "onSortModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.pageChange",
      ),
      value: "onPaginationModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.refresh",
      ),
      value: "onRefresh",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.filtersChange",
      ),
      value: "onFilterModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.rowSelectChange",
      ),
      value: "onRowSelectionModelChange",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.columnVisibilityChange",
      ),
      value: "onColumnVisibilityModel",
    },
  ],
  methods: [
    "refresh",
    "setFilterModel",
    "setColumnVisibilityModel",
    "setPage",
    "setPageSize",
    "setSelectedRows",
    "selectedRowsPrimaryKeys",
  ],
}
