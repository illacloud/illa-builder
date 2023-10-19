import { GridColumnVisibilityModel, GridFilterModel } from "@mui/x-data-grid"
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
  columnVisibilityModel?: GridColumnVisibilityModel
  selectedRowsPrimaryKeys?: GridInputRowSelectionModel
  columns?: ColumnConfig[]
}

export enum ColumnType {
  Auto = "auto",
  Text = "text",
  Date = "date",
  Tag = "tag",
  Time = "time",
  DateTime = "datetime",
  Number = "number",
  Percent = "percent",
  Link = "link",
  Button = "button",
  ButtonGroup = "buttongroup",
  Boolean = "boolean",
  Image = "image",
  IconGroup = "icongroup",
  Rating = "rating",
  Markdown = "markdown",
  HTML = "html",
  Currency = "currency",
}
