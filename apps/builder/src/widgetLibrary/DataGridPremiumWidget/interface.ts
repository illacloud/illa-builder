import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseDataGridProps extends BaseWidgetProps {
  dataSource?: any
  dataSourceJS?: any
  dataSourceMode?: "dynamic" | "select"
  loading?: boolean
  emptyState?: string
}
