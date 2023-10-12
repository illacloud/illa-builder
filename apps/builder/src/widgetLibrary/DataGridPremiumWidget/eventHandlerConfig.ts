import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const DATA_GRID_PREMIUM_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: "onSortModelChange",
      value: "onSortModelChange",
    },
    {
      label: "onPaginationModelChange",
      value: "onPaginationModelChange",
    },
    {
      label: "onRefresh",
      value: "onRefresh",
    },
    {
      label: "onFilterModelChange",
      value: "onFilterModelChange",
    },
    {
      label: "onRowSelected",
      value: "onRowSelected",
    },
  ],
  methods: ["refresh", "setFilterItem"],
}
