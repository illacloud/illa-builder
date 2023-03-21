import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MAP_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.method.map.marker_selected",
      ),
      value: "markerSelect",
    },
    {
      label: i18n.t(
        "editor.method.map.marker_created",
      ),
      value: "markerCreated",
    },
    {
      label: i18n.t(
        "editor.method.map.marker_created",
      ),
      value: "markerChanged",
    },
  ],
  methods: ["setMarkers", "resetMarkers"],
}
