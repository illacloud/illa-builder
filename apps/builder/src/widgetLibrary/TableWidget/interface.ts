import { TableProps } from "@illa-design/table"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

type ColumnType = ''

export interface ColumnItemShape {
  header: string
  accessorKey: string
  value?: string
  label?: string
  disabled?: string
  type?: string
  enableSorting?: boolean
}

export interface WrappedTableProps extends HTMLAttributes<HTMLDivElement>, Pick<TableProps<any, any>,
  | "loading" | "columns" | "defaultSort" | "data"> {
  emptyState?: string
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {

}
