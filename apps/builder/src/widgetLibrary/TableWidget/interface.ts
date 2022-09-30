import { TableProps } from "@illa-design/table"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"
import { ColumnDef } from "@tanstack/react-table"

export const ColumnTypeOption = [
  { label: "Text", value: "text" },
  { label: "Date", value: "date" },
  { label: "Number", value: "number" },
  { label: "Percent", value: "percent" },
  { label: "Link", value: "link" },
]

type ColumnType = "text" | "date" | "number" | "percent" | "link"

export interface ColumnItemShape
  extends Pick<ColumnDef<object>, "cell" | "id"> {
  accessorKey: string
  header: string
  value?: string
  label?: string
  disabled?: string
  type?: ColumnType
  enableSorting?: boolean
  visible?: boolean
  decimalPlaces?: number
  format?: string
}

export interface WrappedTableProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<
      TableProps<any, any>,
      | "loading"
      | "columns"
      | "filter"
      | "download"
      | "overFlow"
      | "defaultSort"
      | "columnVisibility"
      | "multiRowSelection"
      | "data"
    > {
  emptyState?: string
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  handleOnSortingChange?: () => void
  handleOnPaginationChange?: () => void
  handleOnColumnFiltersChange?: () => void
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {}
