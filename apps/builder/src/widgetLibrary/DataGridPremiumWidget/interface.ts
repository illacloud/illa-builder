import { GridFilterModel } from "@mui/x-data-grid"
import { GridInputRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel"
import { ColumnConfig } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseDataGridProps extends BaseWidgetProps {
  dataSource?: any
  dataSourceJS?: any
  dataSourceMode?: "dynamic" | "select"
  loading?: boolean
  emptyState?: string
  sortKey?: string
  sortOrder?: "asc" | "desc" | "default"
  rowSelection?: boolean
  rowSelectionMode?: "single" | "multiple"
  overFlow?: "pagination" | "scroll"
  pageSize?: number
  page?: number
  pageSizeOptions?: number[]
  refreshSetting?: boolean
  quickFilterSetting?: boolean
  exportSetting?: boolean
  exportAllSetting?: boolean
  filterSetting?: boolean
  columnSetting?: boolean
  densitySetting?: boolean
  enableServerSidePagination?: boolean
  excludeHiddenColumns?: boolean
  totalRowCount?: number
  primaryKey?: string
  filterModel?: GridFilterModel
  selectedRowsPrimaryKeys?: GridInputRowSelectionModel
  columns?: ColumnConfig[]
}
