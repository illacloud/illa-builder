import { ReactComponent as MenuWidgetIcon } from "@/assets/widgetCover/menu.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const menuList = [
  {
    id: "1",
    title: "Menu 1",
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
  {
    id: "3",
    title: "Menu 3",
    subMenu: [
      {
        id: "3-1",
        title: "SubMenu 1",
      },
      {
        id: "3-2",
        title: "SubMenu 2",
      },
    ],
  },
]

export const MENU_WIDGET_CONFIG: WidgetConfig = {
  displayName: "menu",
  widgetName: i18n.t("widget.menu.name"),
  h: 7,
  w: 30,
  type: "MENU_WIDGET",
  icon: <MenuWidgetIcon />,
  keywords: ["Menu", "菜单"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    menuList,
    selectedKeys: ["1"],
    mode: "horizontal",
    horizontalAlign: "flex-start",
  },
}
