import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const SWITCH_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onChange"],
  methods: ["setValue", "clearValue", "toggle"],
}
