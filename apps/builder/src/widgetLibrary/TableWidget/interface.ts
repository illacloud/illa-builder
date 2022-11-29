import { TableProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"
import { ColumnDef } from "@tanstack/react-table"

export const ColumnTypeOption = [
  { label: "Text", value: "text" },
  { label: "Date", value: "date" },
  { label: "Number", value: "number" },
  { label: "Percent", value: "percent" },
  { label: "Link", value: "link" },
  { label: "Button", value: "button" },
]

export type ColumnType =
  | "text"
  | "date"
  | "number"
  | "percent"
  | "link"
  | "button"

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
  mappedValue?: string
  custom?: boolean
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
      | "pagination"
      | "defaultSort"
      | "columnVisibility"
      | "multiRowSelection"
      | "data"
    >,
    BaseWidgetProps {
  emptyState?: string
  pageSize?: number
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  handleOnClickMenuItem?: (path: string) => void
  handleOnSortingChange?: () => void
  handleOnPaginationChange?: () => void
  handleOnColumnFiltersChange?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
}

export interface WrappedTableContextProps {
  handleOnClick?: () => void
}
