import { RadioGroupWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"
import i18n from "@/i18n/config"

export const RADIO_GROUP_WIDGET_CONFIG: WidgetConfig = {
  displayName: "radioGroup",
  type: "RADIO_GROUP_WIDGET",
  widgetName: i18n.t("widget.radio_group.name"),
  icon: <RadioGroupWidgetIcon size="100%" />,
  sessionType: "SELECT",
  w: 20,
  h: 5,
  defaults: {
    optionMode: "manual",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    direction: "horizontal",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
    colorScheme: "blue",
  },
}
