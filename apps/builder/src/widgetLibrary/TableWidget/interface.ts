import { TableProps } from "@illa-design/table"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTableProps extends Pick<TableProps<any, any>,
  | "loading" | "columns"> {
  data: object[]
  emptyState?: string
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {

}
