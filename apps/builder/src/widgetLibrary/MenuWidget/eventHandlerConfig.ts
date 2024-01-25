import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MENU_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.click",
      ),
      value: "clickMenuItem",
    },
  ],
  methods: [],
}

export const MAIN_MENU_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.on_menu_select",
      ),
      value: "onMenuSelect",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onMenuLogoClick",
      ),
      value: "onMenuLogoClick",
    },
  ],
  methods: [],
}
