import { ReactComponent as TextInputWidgetIcon } from "@/assets/widgetCover/textInput.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "INPUT_WIDGET",
  displayName: "input",
  widgetName: i18n.t("widget.input.name"),
  icon: <TextInputWidgetIcon />,
  keywords: ["Input", "文本输入框"],
  sessionType: "INPUTS",
  w: 12,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    value: "",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "input",
    placeholder: "input sth",
    $dynamicAttrPaths: ["labelWidth"],
  },
}
