import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
