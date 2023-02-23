import { ReactComponent as TextAreaWidgetIcon } from "@/assets/widgetCover/text.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TEXTAREA_WIDGET_CONFIG: WidgetConfig = {
  type: "TEXTAREA_INPUT_WIDGET",
  displayName: "textarea",
  widgetName: i18n.t("widget.textarea.name"),
  icon: <TextAreaWidgetIcon />,
  keywords: ["Textarea Input", "长文本输入框"],
  sessionType: "INPUTS",
  w: 15,
  h: 8,
  defaults: {
    value: "",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "textarea",
    placeholder: "enter sth",
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
