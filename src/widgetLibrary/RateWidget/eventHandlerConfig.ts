import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const RATE_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
