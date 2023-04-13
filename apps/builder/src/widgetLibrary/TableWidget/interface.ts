import { ColumnDef } from "@tanstack/react-table"
import { HTMLAttributes } from "react"
import { ButtonColorScheme, ImageProps, TableProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export const ColumnTypeOption = [
  { label: "Auto", value: "auto" },
  { label: "Text", value: "text" },
  { label: "Date", value: "date" },
  { label: "Number", value: "number" },
  { label: "Percent", value: "percent" },
  { label: "Link", value: "link" },
  { label: "Button", value: "button" },
  { label: "Boolean", value: "boolean" },
  { label: "Image", value: "image" },
]

export const defaultColumnItem: Partial<ColumnItemShape> = {
  enableSorting: true,
  type: "auto",
  visible: true,
  format: "YYYY-MM-DD",
  colorScheme: "blue",
  objectFit: "scale-down",
}

export type ColumnType =
  | "auto"
  | "text"
  | "date"
  | "number"
  | "percent"
  | "link"
  | "button"
  | "boolean"
  | "image"

export interface ColumnItemShape
  extends Pick<ColumnDef<object>, "cell" | "id"> {
  accessorKey: string
  header: string
  value?: string
  label?: string
  type?: ColumnType
  disabled?: boolean
  colorScheme?: ButtonColorScheme
  objectFit?: ImageProps["objectFit"]
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
      | "columnSizing"
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
