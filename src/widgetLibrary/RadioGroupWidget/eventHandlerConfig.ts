import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const RADIO_GROUP_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
