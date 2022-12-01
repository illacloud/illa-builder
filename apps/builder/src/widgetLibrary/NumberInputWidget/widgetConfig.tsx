import { ReactComponent as NumberInputWidgetIcon } from "@/assets/widgetCover/numberInput.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const NUMBER_INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "NUMBER_INPUT_WIDGET",
  widgetName: i18n.t("widget.number_input.name"),
  displayName: "numberInput",
  icon: <NumberInputWidgetIcon />,
  keywords: ["Number Input", "数字输入框"],
  sessionType: "INPUTS",
  w: 12,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "numberInput",
  },
}
