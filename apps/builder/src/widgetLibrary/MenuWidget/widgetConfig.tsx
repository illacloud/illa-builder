import { ReactComponent as MenuWidgetIcon } from "@/assets/widgetCover/menu.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

const menuList = [
  {
    title: "title",
    icon: "icon",
    hidden: true,
    disabled: true,
    subMenu: [
      {
        title: "1111",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
      {
        title: "2222",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
    ],
  },
  {
    title: "answer",
    icon: "icon",
    hidden: true,
    disabled: true,
    subMenu: [
      {
        title: "abcd",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
      {
        title: "edfg",
        icon: "icon",
        hidden: true,
        disabled: true,
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
    emptyState: "No rows found",
    overFlow: "pagination",
    download: false,
    filter: false,
    pageSize: `{{10}}`,
  },
}
