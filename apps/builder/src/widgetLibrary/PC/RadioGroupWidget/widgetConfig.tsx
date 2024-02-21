import { v4 } from "uuid"
import RadioGroupWidgetIcon from "@/assets/widgetCover/radioGroup.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RADIO_GROUP_WIDGET_CONFIG: WidgetConfig = {
  displayName: "radioGroup",
  type: "RADIO_GROUP_WIDGET",
  widgetName: i18n.t("widget.radio_group.name"),
  icon: <RadioGroupWidgetIcon />,
  keywords: ["Radio Group", "单选框组"],
  sessionType: "SELECT",
  w: 13,
  h: 3,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    optionConfigureMode: "static",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    value: "Option 1",
    direction: "horizontal",
    dataSources: "{{[]}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "radioButton",
  },
}
