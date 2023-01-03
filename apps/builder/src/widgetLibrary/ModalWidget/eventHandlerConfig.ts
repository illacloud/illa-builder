import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MODAL_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onOpenModal",
      ),
      value: "onOpenModal",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.onCloseModal",
      ),
      value: "onCloseModal",
    },
  ],
  methods: ["openModal", "closeModal"],
}
