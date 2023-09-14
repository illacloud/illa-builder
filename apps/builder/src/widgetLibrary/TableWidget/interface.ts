import { ColumnDef } from "@tanstack/react-table"
import { HTMLAttributes } from "react"
import {
  ButtonColorScheme,
  ButtonProps,
  ImageProps,
  TableProps,
} from "@illa-design/react"
import { CellItemProps } from "@/page/App/components/InspectPanel/PanelSetters/TableSetter/CellSetter/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export enum Columns {
  Auto = "auto",
  Text = "text",
  Date = "date",
  Tag = "tag",
  Time = "time",
  DateTime = "datetime",
  Number = "number",
  Percent = "percent",
  Link = "link",
  Button = "button",
  ButtonGroup = "buttongroup",
  Boolean = "boolean",
  Image = "image",
  IconGroup = "icongroup",
  Rating = "rating",
  Markdown = "markdown",
  // HTML = "html",
  Currency = "currency",
}

export type ColumnType = Lowercase<keyof typeof Columns>

export const ColumnTypeOption = Object.entries(Columns).map(([key, value]) => {
  return {
    label: key,
    value: value as ColumnType,
  }
})

export const defaultColumnItem: Partial<ColumnItemShape> = {
  enableSorting: true,
  type: "auto",
  visible: true,
  format: "YYYY-MM-DD",
  colorScheme: "blue",
  objectFit: "scale-down",
  tagColor: "auto",
  alignment: "left",
}

export interface ColumnItemShape
  extends Pick<ColumnDef<object>, "cell" | "id" | "meta"> {
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
  showThousandsSeparator?: boolean
  format?: string
  mappedValue?: string
  custom?: boolean
  fromCurrentRow?: Record<string, boolean>
  events?: any[]
  columnIndex?: number
  alignment?: TableCellAlign
  backgroundColor?: string
  // button type
  variant?: ButtonProps["variant"]
  // icon type
  iconName?: string
  iconGroupContent?: TableCellIconGroupItemProps[]
  // currency type
  currencyCode?: string
  // tag type
  tagLabel?: string
  tagColor?: string | "auto"
  tagColorJs?: string | "auto"
  tagColorMode?: "select" | "dynamic"
  // button group type
  buttonGroupContent?: TableCellButtonGroupItemProps[]
}

export type TableCellAlign = "left" | "center" | "right"

export interface TableCellButtonGroupItemProps extends CellItemProps {
  colorScheme?: ButtonColorScheme
  disabled?: boolean
  variant?: ButtonProps["variant"]
  fromCurrentRow?: Record<string, boolean>
}

export interface TableCellIconGroupItemProps extends CellItemProps {
  colorScheme?: string
  disabled?: boolean
  fromCurrentRow?: Record<string, boolean>
}

export const tagColorSchemeOptions = [
  "auto",
  "blackAlpha",
  "gray",
  "grayBlue",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple",
  "techPurple",
  "techPink",
]

export interface TableCommonProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<
      TableProps<any, any>,
      | "loading"
      | "columns"
      | "filter"
      | "refresh"
      | "download"
      | "downloadRawData"
      | "overFlow"
      | "pagination"
      | "defaultSort"
      | "rowSelection"
      | "columnVisibility"
      | "multiRowSelection"
      | "enableSingleCellSelection"
      | "columnSizing"
      | "data"
    > {
  emptyState?: string
  pageSize?: number
  pageIndex?: number
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  selectedRow?: any[]
  enableServerSidePagination?: boolean
  paginationType?:
    | "limitOffsetBased"
    | "cursorBased"
    | "graphqlRelayCursorBased"
  totalRowCount?: number
  nextBeforeCursor?: number
  nextAfterCursor?: number
  hasNextPage?: boolean
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface WrappedTableProps
  extends TableCommonProps,
    Omit<BaseWidgetProps, "triggerEventHandler"> {
  customColumns?: Record<number, string>
  clickOutsideToResetSelection?: boolean
  handleOnClickMenuItem?: (path: string) => void
  handleOnCellSelect: () => void
  handleOnSortingChange: () => void
  handleOnPaginationChange: () => void
  handleOnFiltersChange: () => void
  handleOnRowSelectChange: () => void
  handleOnRowClick: () => void
  handleOnRefresh: () => void
}

// todo: @echoxyc error extends
export interface TableWidgetProps extends TableCommonProps, BaseWidgetProps {
  columns: ColumnItemShape[]
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
}

export interface WrappedTableContextProps {
  handleOnClick?: () => void
}
