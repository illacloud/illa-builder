import { TabsWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const TABS_WIDGET_CONFIG: WidgetConfig = {
  displayName: "tabs",
  widgetName: i18n.t("widget.tabs.name"),
  h: 4,
  w: 12,
  type: "TEXT_WIDGET",
  icon: <TabsWidgetIcon size="100%" />,
  keywords: ["Tabs", "选项卡"],
  sessionType: "PRESENTATION",
  defaults: {
    // value: i18n.t("widget.text.default_value"),
    // horizontalAlign: "start",
    // verticalAlign: "center",
    // colorScheme: "grayBlue",
  },
}
