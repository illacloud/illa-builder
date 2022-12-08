import { v4 } from "uuid"
import { ReactComponent as ChartWidgetIcon } from "@/assets/widgetCover/chart.svg"
import i18n from "@/i18n/config"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import store from "@/store"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CHART_WIDGET_CONFIG: WidgetConfig = {
  type: "CHART",
  displayName: "chart",
  widgetName: i18n.t("widget.chart.name"),
  keywords: ["Chart", "图表"],
  icon: <ChartWidgetIcon />,
  sessionType: "DATA",
  w: 20,
  h: 40,
  defaults: initChartWidgetDefaultProps,
}

export function initChartWidgetDefaultProps() {
  return {
    dataSourceJS: `{{[
  {
    month: "April",
    users: 3700,
    incomes: 4000,
  },
  {
    month: "May",
    users: 5400,
    incomes: 8700,
  },
  {
    month: "June",
    users: 6000,
    incomes: 12000,
  },
  {
    month: "July",
    users: 8000,
    incomes: 14000,
  },
]}}`,
    chartType: "bar",
    dataSourceMode: "dynamic",
    xAxis: "month",
    datasets: [
      {
        id: v4(),
        datasetName: "Dataset 1",
        datasetValues: "users",
        aggregationMethod: "SUM",
        type: "bar",
        color: "#165DFF",
      },
    ],
    $dynamicAttrPaths: ["dataSourceJS"],
  }
}
