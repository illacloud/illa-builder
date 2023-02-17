import { ChartType } from "chart.js"
import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/Chart"

export interface ListItemProps {
  color: string
  isHidden: boolean
  datasetName: string
  datasetMethod: string
  index: number
}

export interface ChartDatasetShape {
  id: string
  datasetName: string
  datasetValues: string
  aggregationMethod: CHART_DATASET_AGGREGATION_METHOD
  type: ChartType
  color: string
  isHidden: boolean
}

export interface ChartDatasetsSetterProps extends BaseSetter, PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
  // TODO: not use any
  value?: any
}

export interface ListBodyProps {
  datasets: ChartDatasetShape[]
}
