import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const INPUT_NUMBER_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange", "onFocus", "onBlur"],
  methods: ["focus", "setValue", "clearValue", "validate", "clearValidation"],
}
