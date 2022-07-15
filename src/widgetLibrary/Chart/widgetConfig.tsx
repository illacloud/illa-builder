import { defaultChartJsonData, defaultOptionsJson } from "./interface"
import { ChartWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const CHART_WIDGET_CONFIG: WidgetConfig = {
  type: "CHART",
  displayName: "chart",
  widgetName: i18n.t("widget.chart.name"),
  icon: <ChartWidgetIcon size="100%" />,
  sessionType: "DATE",
  w: 20,
  h: 40,
  defaults: {
    type: "line",
    configType: "UIForm",
    chartJson: defaultChartJsonData,
    layoutConfigType: "UIForm",
    layoutJson: defaultOptionsJson,
    title: "chart",
  },
}
