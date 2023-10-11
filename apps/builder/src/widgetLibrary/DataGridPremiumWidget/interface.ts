import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseDataGridProps extends BaseWidgetProps {
  dataSource?: any
  dataSourceJS?: any
  dataSourceMode?: "dynamic" | "select"
  loading?: boolean
  emptyState?: string
  defaultSortKey?: string
  defaultSortOrder?: "asc" | "desc" | "default"
  multiRowSelection?: boolean
  overFlow?: "pagination" | "scroll"
  pageSize?: number
  page?: number
  pageSizeOptions?: number[]
  refreshSetting?: boolean
  exportSetting?: boolean
  exportAllSetting?: boolean
  filterSetting?: boolean
  columnSetting?: boolean
  densitySetting?: boolean
  enableServerSidePagination?: boolean
  totalRowCount?: number
}
