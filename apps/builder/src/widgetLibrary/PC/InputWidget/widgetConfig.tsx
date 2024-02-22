import TextInputWidgetIcon from "@/assets/widgetCover/textInput.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "INPUT_WIDGET",
  displayName: "input",
  widgetName: i18n.t("widget.input.name"),
  icon: <TextInputWidgetIcon />,
  keywords: ["Input", "文本输入框"],
  sessionType: "INPUTS",
  w: 6,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    value: undefined,
    defaultValue: "",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "input",
    placeholder: "input sth",
    $dynamicAttrPaths: ["labelWidth"],
    type: "input",
    showVisibleButton: "{{true}}",
  },
}
