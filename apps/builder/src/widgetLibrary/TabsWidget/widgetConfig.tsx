import { v4 } from "uuid"
import { ReactComponent as TabsWidgetIcon } from "@/assets/widgetCover/tabs.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

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
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    tabList: defaultTabList,
    viewList: [],
    align: "flex-start",
    colorScheme: "blue",
    tabPosition: "top",
    currentIndex: 0,
    currentKey: "Tab 1",
  },
}
