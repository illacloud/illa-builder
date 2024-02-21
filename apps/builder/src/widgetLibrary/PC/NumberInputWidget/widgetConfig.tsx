import NumberInputWidgetIcon from "@/assets/widgetCover/numberInput.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const NUMBER_INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "NUMBER_INPUT_WIDGET",
  widgetName: i18n.t("widget.number_input.name"),
  displayName: "numberInput",
  icon: <NumberInputWidgetIcon />,
  keywords: ["Number Input", "数字输入框"],
  sessionType: "INPUTS",
  w: 6,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    label: "Label",
    defaultValue: "",
    value: undefined,
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "numberInput",
  },
}
