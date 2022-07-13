import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const SELECT_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: ["onInputValueChange", "onChange", "onFocus", "onBlur"],
  methods: ["setValue", "clearValue", "validate", "clearValidation"],
}
