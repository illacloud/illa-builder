import EditableTextWidgetIcon from "@/assets/widgetCover/editableText.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const EDITABLE_TEXT_WIDGET_CONFIG: WidgetConfig = {
  type: "EDITABLE_TEXT_WIDGET",
  displayName: "editable_text",
  widgetName: i18n.t("widget.editable_text.name"),
  icon: <EditableTextWidgetIcon />,
  keywords: ["Editable Text", "可编辑文本"],
  sessionType: "INPUTS",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  w: 12,
  h: 5,
  version: 0,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
    value: "editable text for display",
    defaultValue: "editable text for display",
  },
}
