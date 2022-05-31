import { ComponentModel } from "@/wrappedComponents/interface"
import { EditableTextIcon } from "@/wrappedComponents/EditableText/svg"

export const EDITABLE_TEXT_WIDGET_CONFIG: ComponentModel = {
  type: "EDITABLE_TEXT_WIDGET",
  widgetName: "editableText",
  version: "0.0.1",
  icon: <EditableTextIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
