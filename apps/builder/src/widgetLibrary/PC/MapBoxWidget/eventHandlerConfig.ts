import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MAP_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.markerSelected",
      ),
      value: "markerSelected",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.markerCreated",
      ),
      value: "markerCreated",
    },
  ],
  methods: ["setMarkers", "resetMarkers"],
}
