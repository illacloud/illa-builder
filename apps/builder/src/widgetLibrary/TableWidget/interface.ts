import { TableProps } from "@illa-design/table"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

export interface WrappedTableProps extends HTMLAttributes<HTMLDivElement>, Pick<TableProps<any, any>,
  | "loading" | "columns" | "defaultSort"> {
  data: object[]
  emptyState?: string
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {

}
