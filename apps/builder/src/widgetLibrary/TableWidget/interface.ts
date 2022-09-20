import { TableProps } from "@illa-design/table"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

export interface WrappedTableProps extends HTMLAttributes<HTMLDivElement>, Pick<TableProps<any, any>,
  | "loading" | "columns"> {
  data: object[]
  emptyState?: string
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {

}
