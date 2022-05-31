import { ComponentModel } from "@/wrappedComponents/interface"
import { EditableTextIcon } from "@/wrappedComponents/EditableText/svg"
import { ChartIcon } from "@/wrappedComponents/Chart/svg"

export const CHART_WIDGET_CONFIG: ComponentModel = {
  type: "CHART_WIDGET",
  widgetName: "chart",
  version: "0.0.1",
  icon: <ChartIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 500,
    columns: 500,
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
