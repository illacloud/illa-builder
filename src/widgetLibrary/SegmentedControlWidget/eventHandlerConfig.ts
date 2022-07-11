import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const SEGMENTED_CONTROL_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
