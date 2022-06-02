import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/Editor/components/InspectPanel/interface"
<<<<<<< Updated upstream
import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"
=======
import { DatasetConfig } from "@/wrappedComponents/Chart/interface"
>>>>>>> Stashed changes

export interface ListSetterProps extends PanelLabelProps, BaseSetter {
  childrenSetter?: PanelFieldConfig[]
}

export interface ChartDatasetsProps extends PanelLabelProps {
  options?: DatasetConfig[]
}
