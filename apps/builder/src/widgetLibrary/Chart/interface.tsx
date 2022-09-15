import { BaseComponentNodeProps } from "@/widgetLibrary/interface"

export interface WrappedChartProps extends ChartWidgetProps {}

export interface ChartWidgetProps extends BaseComponentNodeProps {}

export enum CHART_TYPE {
  "BAR" = "BAR",
  "LINE" = "LINE",
  "SCATTERPLOT" = "SCATTERPLOT",
  "PIE" = "PIE",
}

export enum CHART_DATASET_AGGREGATION_METHOD {
  "SUM" = "SUM",
  "COUNT" = "COUNT",
  "AVERAGE" = "AVERAGE",
  "MEDIAN" = "MEDIAN",
  "MIN" = "MIN",
  "MAX" = "MAX",
}

// export interface ChartDatasetsShape {
//   id: string
//   datasetName: string
//   datasetValues: string
//   method
// }
