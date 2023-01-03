import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const MODAL_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: "onOpen",
      value: "onOpenModal",
    },
    {
      label: "onClose",
      value: "onCloseModal",
    },
  ],
  methods: ["openModal", "closeModal"],
}
