import { ReactComponent as MenuWidgetIcon } from "@/assets/widgetCover/menu.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

const menuList = [
  {
    id: "1",
    title: "title",
    icon: "icon",
    hidden: true,
    disabled: true,
    subMenu: [
      {
        id: "1-1",
        title: "1111",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
      {
        id: "1-2",
        title: "2222",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
    ],
  },
  {
    id: "2",
    title: "answer",
    icon: "icon",
    hidden: true,
    disabled: true,
    subMenu: [
      {
        id: "2-1",
        title: "abcd",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
      {
        id: "2-2",
        title: "edfg",
        icon: "icon",
        hidden: true,
        disabled: true,
      },
    ],
  },
  {
    id: "3",
    title: "title",
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
    emptyState: "No rows found",
    overFlow: "pagination",
    download: false,
    filter: false,
    pageSize: `{{10}}`,
  },
}
