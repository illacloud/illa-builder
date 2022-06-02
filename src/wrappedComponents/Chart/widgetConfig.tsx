import { ComponentModel } from "@/wrappedComponents/interface"
import { EditableTextIcon } from "@/wrappedComponents/EditableText/svg"
import { ChartIcon } from "@/wrappedComponents/Chart/svg"
import {
  defaultChartData,
  defaultChartJsonData,
} from "@/wrappedComponents/Chart/interface"

export const CHART_WIDGET_CONFIG: ComponentModel = {
  type: "CHART_WIDGET",
  widgetName: "chart",
  version: "0.0.1",
  icon: <ChartIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 500,
    columns: 500,
    width: "200px",
    type: "line",
    configType: "UIForm",
    data: defaultChartData,
    chartJson: defaultChartJsonData,
  },
}
