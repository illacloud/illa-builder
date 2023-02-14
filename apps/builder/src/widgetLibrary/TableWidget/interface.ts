import { ColumnDef } from "@tanstack/react-table"
import { HTMLAttributes } from "react"
import { TableProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

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
  fromCurrentRow?: Record<string, boolean>
  events?: any[]
  columnIndex?: number
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
      | "rowSelection"
      | "columnVisibility"
      | "multiRowSelection"
      | "data"
    >,
    Omit<BaseWidgetProps, "triggerEventHandler"> {
  emptyState?: string
  pageSize?: number
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  selectedRow?: any[]
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
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
}

export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {
  columns: ColumnItemShape[]
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
}

export interface WrappedTableContextProps {
  handleOnClick?: () => void
}
