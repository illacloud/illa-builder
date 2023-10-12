import { ReactComponent as TableWidgetIcon } from "@/assets/widgetCover/table.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const DATA_GRID_PREMIUM_WIDGET_CONFIG: WidgetConfig = {
  version: 0,
  type: "DATA_GRID_PREMIUM_WIDGET",
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
    dataSource: [],
    overFlow: "pagination",
  },
}
