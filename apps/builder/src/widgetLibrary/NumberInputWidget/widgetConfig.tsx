import { NumberInputWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const NUMBER_INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "NUMBER_INPUT_WIDGET",
  widgetName: i18n.t("widget.number_input.name"),
  displayName: "numberInput",
  icon: <NumberInputWidgetIcon size="100%" />,
  keywords: ["Number Input", "数字输入框"],
  sessionType: "INPUTS",
  w: 12,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    max: "{{Infinity}}",
    min: "{{-Infinity}}",
    hidden: false,
  },
}
