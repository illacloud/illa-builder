import { ChartDataset, ChartType } from "chart.js"
import { ChartDatasetShape } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { BaseComponentNodeProps } from "@/widgetLibrary/interface"

export interface WrappedChartProps
  extends Omit<ChartWidgetProps, "xAxis" | "datasets"> {
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
  xAxis: string
  datasets: ChartDatasetShape[]
}

export interface ChartWidgetProps extends BaseComponentNodeProps {
  xAxis: string[]
  groupBy?: string
  chartTitle: string
  xAxisName: string
  yAxisName: string
  chartType: ChartType
  datasets: ChartDataset[]
}

export enum CHART_DATASET_AGGREGATION_METHOD {
  "SUM" = "SUM",
  "COUNT" = "COUNT",
  "AVERAGE" = "AVERAGE",
  "MEDIAN" = "MEDIAN",
  "MIN" = "MIN",
  "MAX" = "MAX",
}
