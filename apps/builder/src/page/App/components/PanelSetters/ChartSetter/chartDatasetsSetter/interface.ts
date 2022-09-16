import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"

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
  aggregationMethod: string
  type: "bar" | "line" | "scatter"
  color: string
  isHidden: boolean
}

export interface EditModalProps {
  title: string
  attrPath: string
}

export interface ChartDatasetsSetterProps extends BaseSetter, PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
}

export interface ListBodyProps {
  datasets: ChartDatasetShape[]
}
