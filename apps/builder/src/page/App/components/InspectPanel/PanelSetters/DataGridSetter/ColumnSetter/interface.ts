import {
  GridAlignment,
  GridColType,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid-premium"
import { ReactNode } from "react"
import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export type ColumnType =
  | "auto"
  | "text"
  | "date"
  | "tag"
  | "datetime"
  | "number"
  | "percent"
  | "link"
  | "button"
  | "buttongroup"
  | "boolean"
  | "image"
  | "avatar"
  | "rating"
  | "markdown"
  | "html"
  | "currency"

export interface ColumnConfig {
  isCalc?: boolean
  type?: GridColType
  align?: GridAlignment
  columnType: ColumnType
  field: string
  headerName: string
  width: number
  description: string
  sortable: boolean
  pinnable: boolean
  filterable: boolean
  hideable: boolean
  aggregable: boolean
  groupable: boolean
  resizable: boolean
  disableReorder: boolean
  headerAlign: GridAlignment
  aggregationModel?: string
  valueGetter?: (params: GridValueGetterParams) => any
  renderCell?: (params: GridRenderCellParams) => ReactNode
}

export interface ColumnSetterProps extends BaseSetter {
  value: ColumnConfig[]
}
