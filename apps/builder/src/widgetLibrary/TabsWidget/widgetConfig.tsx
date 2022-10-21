import { ReactComponent as TabsWidgetIcon } from "@/assets/widgetCover/tabs.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"
import { v4 } from "uuid"

const defaultTabList = [
  { id: v4(), key: "Tab 1", label: "Tab 1" },
  { id: v4(), key: "Tab 2", label: "Tab 2" },
  { id: v4(), key: "Tab 3", label: "Tab 3" },
]

export const TABS_WIDGET_CONFIG: WidgetConfig = {
  displayName: "tabs",
  widgetName: i18n.t("widget.tabs.name"),
  h: 6,
  w: 12,
  type: "TABS_WIDGET",
  icon: <TabsWidgetIcon />,
  keywords: ["Tabs", "选项卡"],
  sessionType: "PRESENTATION",
  defaults: {
    tabList: defaultTabList,
    viewList: [],
    align: "flex-start",
    colorScheme: "blue",
    tabPosition: "top",
  },
}
