import { ChartDataset, ChartType } from "chart.js"
import { ChartDatasetShape } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/interface"

export interface WrappedChartProps
  extends Omit<ChartWidgetProps, "xAxis" | "datasets"> {
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
  xAxis: string
  datasets: ChartDatasetShape[]
}

export interface ChartWidgetProps {
  xAxis: string[]
  groupBy?: string
  chartTitle: string
  xAxisName: string
  yAxisName: string
  chartType: ChartType
  datasets: ChartDataset[]
  direction: "x" | "y"
  isStack?: boolean
  legendPosition?: "top" | "bottom" | "left" | "right" | "hidden"
  gridLineColor?: string
  backgroundColor?: string
  xType?: "default" | "time"
  dateFormat?: string
}

export enum CHART_DATASET_AGGREGATION_METHOD {
  "SUM" = "SUM",
  "COUNT" = "COUNT",
  "AVERAGE" = "AVERAGE",
  "MEDIAN" = "MEDIAN",
  "MIN" = "MIN",
  "MAX" = "MAX",
}
