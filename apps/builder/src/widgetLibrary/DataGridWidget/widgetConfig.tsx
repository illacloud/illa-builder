import { ReactComponent as TableWidgetIcon } from "@/assets/widgetCover/table.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

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

export const DATA_GRID_WIDGET_CONFIG: WidgetConfig = {
  version: 0,
  type: "DATA_GRID_WIDGET",
  displayName: "dataGrid",
  widgetName: i18n.t("widget.data_grid.name"),
  icon: <TableWidgetIcon />,
  keywords: ["dataGrid", "数据表格", "table", "表格"],
  sessionType: "DATA",
  resizeDirection: RESIZE_DIRECTION.ALL,
  w: 18,
  h: 50,
  defaults: {
    dataSourceMode: "dynamic",
    excludeHiddenColumns: true,
    dataSourceJS: `{{${JSON.stringify(originData, null, "  ")}}}`,
    dataSource: [],
    overFlow: "scroll",
    sortOrder: "default",
  },
}
