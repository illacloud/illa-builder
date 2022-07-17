import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const DATE_TIME_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: [
    "setValue",
    "clearValue",
    "validate",
    "clearValidation",
    "setDisabled",
  ],
}
