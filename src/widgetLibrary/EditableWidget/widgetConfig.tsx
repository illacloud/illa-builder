import { EditableTextWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const EDITABLE_TEXT_WIDGET_CONFIG: WidgetConfig = {
  type: "EDITABLE_TEXT_WIDGET",
  displayName: "editable_text",
  widgetName: "widget.editable_text.name",
  icon: <EditableTextWidgetIcon size="100%" />,
  sessionType: "INPUTS",
  w: 10,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
    hidden: false,
  },
}
