import {
  GridAggregationModel,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridInputRowSelectionModel,
} from "@mui/x-data-grid-premium"
import i18n from "i18next"
import { ColumnConfig } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseDataGridProps extends BaseWidgetProps {
  dataSource?: any
  dataSourceJS?: any
  dataSourceMode?: "dynamic" | "static"
  loading?: boolean
  emptyState?: string
  sortKey?: string
  sortOrder?: "asc" | "desc" | "default"
  rowSelection?: boolean
  rowSelectionMode?: "single" | "multiple"
  pageSize?: number
  page?: number
  pageSizeOptions?: number[]
  refreshSetting?: boolean
  quickFilterSetting?: boolean
  exportSetting?: boolean
  exportAllSetting?: boolean
  filterSetting?: boolean
  columnSetting?: boolean
  densitySetting?: boolean
  enableServerSidePagination?: boolean
  excludeHiddenColumns?: boolean
  totalRowCount?: number
  primaryKey?: string
  filterModel?: GridFilterModel
  columnVisibilityModel?: GridColumnVisibilityModel
  selectedRowsPrimaryKeys?: GridInputRowSelectionModel
  columns?: ColumnConfig[]
  enablePagination?: boolean
  aggregationModel?: GridAggregationModel
}

export const ColumnTypeList = [
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.auto"),
    value: "auto",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.text"),
    value: "text",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.date"),
    value: "date",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.tag"),
    value: "tag",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.datetime"),
    value: "datetime",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.number"),
    value: "number",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.percent"),
    value: "percent",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.currency"),
    value: "currency",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.link"),
    value: "link",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.button"),
    value: "button",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.buttongroup"),
    value: "buttongroup",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.boolean"),
    value: "boolean",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.image"),
    value: "image",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.avatar"),
    value: "avatar",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.rating"),
    value: "rating",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.markdown"),
    value: "markdown",
  },
  {
    label: i18n.t("editor.inspect.setter_option.table.column_type.html"),
    value: "html",
  },
]
