import { ColumnDef } from "@tanstack/react-table"
import { HTMLAttributes } from "react"
import {
  ButtonColorScheme,
  ButtonProps,
  ImageProps,
  TableProps,
} from "@illa-design/react"
import { CellItemProps } from "@/page/App/components/PanelSetters/TableSetter/CellSetter/interface"
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
  showThousandsSeparator?: boolean
  format?: string
  mappedValue?: string
  custom?: boolean
  fromCurrentRow?: Record<string, boolean>
  events?: any[]
  columnIndex?: number
  alignment?: TableCellAlign
  backgroundColor?: string
  // icon type
  iconName?: string
  iconGroupContent?: TableCellIconGroupItemProps[]
  // currency type
  currencyCode?: string
  // tag type
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

// todo: @echoxyc error extends
export interface TableWidgetProps extends WrappedTableProps, BaseWidgetProps {
  columns: ColumnItemShape[]
  dataSource: any[]
  dataSourceJS: any[]
  dataSourceMode: "select" | "dynamic"
}

export interface WrappedTableContextProps {
  handleOnClick?: () => void
}
