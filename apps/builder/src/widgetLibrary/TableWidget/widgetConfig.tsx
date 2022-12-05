import { ReactComponent as TableWidgetIcon } from "@/assets/widgetCover/table.svg"
import i18n from "@/i18n/config"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import store from "@/store"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const TABLE_WIDGET_CONFIG: WidgetConfig = {
  displayName: "table",
  widgetName: i18n.t("widget.table.name"),
  h: 40,
  w: 32,
  type: "TABLE_WIDGET",
  icon: <TableWidgetIcon />,
  keywords: ["Table", "表格"],
  sessionType: "DATE",
  defaults: initTableWidgetDefaultProps(),
}

export function initTableWidgetDefaultProps() {
  const rootState = store.getState()
  const actions = getActionList(rootState)
  const dataSource = actions.length
    ? `{{${actions[0]?.displayName}.data}}`
    : undefined

  return {
    dataSource,
    columns: [],
    emptyState: "No rows found",
    overFlow: "pagination",
    download: false,
    filter: false,
    pageSize: `{{10}}`,
  }
}
