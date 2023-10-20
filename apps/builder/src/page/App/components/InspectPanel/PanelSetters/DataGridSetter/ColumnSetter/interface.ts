import { GridBaseColDef } from "@mui/x-data-grid/models/colDef/gridColDef"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export interface ColumnConfig extends GridBaseColDef {
  isCalc?: boolean
  columnType: string
}

export interface ColumnListSetterProps extends BaseSetter {
  value: ColumnConfig[]
}
