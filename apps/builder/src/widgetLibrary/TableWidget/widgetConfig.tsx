import { ReactComponent as TableWidgetIcon } from "@/assets/widgetCover/table.svg"
import i18n from "@/i18n/config"
import { tansTableDataToColumns } from "@/widgetLibrary/TableWidget/utils"
import { WidgetConfig } from "@/widgetLibrary/interface"

const originData = [
  {
    month: "April",
    users: 3700,
    incomes: 4000,
  },
  {
    month: "May",
    users: 5400,
    incomes: 8700,
  },
  {
    month: "June",
    users: 6000,
    incomes: 12000,
  },
  {
    month: "July",
    users: 8000,
    incomes: 14000,
  },
]

export const TABLE_WIDGET_CONFIG: WidgetConfig = {
  displayName: "table",
  widgetName: i18n.t("widget.table.name"),
  h: 40,
  w: 32,
  type: "TABLE_WIDGET",
  icon: <TableWidgetIcon />,
  keywords: ["Table", "表格"],
  sessionType: "DATA",
  defaults: initTableWidgetDefaultProps(),
}

export function initTableWidgetDefaultProps() {
  return {
    dataSourceMode: "dynamic",
    dataSourceJS: `{{${JSON.stringify(originData, null, "  ")}}}`,
    columns: tansTableDataToColumns(originData),
    defaultSortKey: "default",
    defaultSortOrder: "ascend",
    emptyState: "No rows found",
    overFlow: "pagination",
    download: false,
    filter: false,
    pageSize: `{{10}}`,
  }
}
