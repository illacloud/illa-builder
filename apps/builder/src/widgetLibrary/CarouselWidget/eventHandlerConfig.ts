import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const CAROUSEL_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.click",
      ),
      value: "click",
    },
  ],
  methods: ["slickNext", "slickPrevious"],
}

export const generatorMappedCarouselEventHandlerConfig = (
  baseWidgetName: string,
  events: { label: string; value: string }[] = [],
  labelName: string = i18n.t("editor.inspect.setter_label.event_handler"),
  attrName: string = "events",
  defaultValue?: string,
  labelDesc?: string,
) => {
  const config = generatorEventHandlerConfig(
    baseWidgetName,
    events,
    labelName,
    attrName,
    defaultValue,
    labelDesc,
  )
  // [INPUT_SETTER] need to be replaced with [OPTION_MAPPED_INPUT_SETTER]
  config.childrenSetter = config.childrenSetter?.map((item) => {
    if (item.setterType === "INPUT_SETTER") {
      item.setterType = "OPTION_MAPPED_INPUT_SETTER"
      item.expectedType = VALIDATION_TYPES.ARRAY
    }
    return item
  })
  return config
}
