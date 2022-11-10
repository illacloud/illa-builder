import { ReactComponent as MenuWidgetIcon } from "@/assets/widgetCover/menu.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

const menuList = [
  {
    id: "1",
    title: "Menu 1",
    subMenu: [
      {
        id: "1-1",
        title: "SubMenu 1",
      },
      {
        id: "1-2",
        title: "SubMenu 2",
      },
    ],
  },
  {
    id: "2",
    title: "Menu 2",
    subMenu: [
      {
        id: "2-1",
        title: "SubMenu 1",
      },
      {
        id: "2-2",
        title: "SubMenu 2",
      },
    ],
  },
]

export const MENU_WIDGET_CONFIG: WidgetConfig = {
  displayName: "menu",
  widgetName: i18n.t("widget.menu.name"),
  h: 20,
  w: 42,
  type: "MENU_WIDGET",
  icon: <MenuWidgetIcon />,
  keywords: ["Menu", "菜单"],
  sessionType: "PRESENTATION",
  defaults: {
    menuList,
    mode: "vertical",
    horizontalAlign: "flex-start",
  },
}
