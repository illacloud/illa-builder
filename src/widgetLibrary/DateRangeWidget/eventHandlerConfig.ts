import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const DATE_RANGE_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: [
    "setStartValue",
    "setEndValue",
    "clearValue",
    "validate",
    "clearValidation",
    "setDisabled",
  ],
}
