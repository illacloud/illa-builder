import { v4 } from "uuid"
import MenuWidgetIcon from "@/assets/widgetCover/menu.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const items = [
  {
    id: v4(),
    value: "menu0",
    label: "Menu 0",
  },
  {
    id: v4(),
    value: "menu1",
    label: "Menu 1",
    subItems: [
      {
        id: v4(),
        value: "menu1:subMenu0",
        label: "Sub Menu 0",
      },
      {
        id: v4(),
        value: "menu1:subMenu1",
        label: "Sub Menu 1",
      },
    ],
  },
  {
    id: v4(),
    value: "menu2",
    label: "Menu 2",
    subItems: [
      {
        id: v4(),
        value: "menu2:subMenu0",
        label: "Sub Menu 0",
      },
      {
        id: v4(),
        value: "menu2:subMenu1",
        label: "Sub Menu 1",
      },
    ],
  },
]

export const MENU_WIDGET_CONFIG: WidgetConfig = {
  displayName: "menu",
  widgetName: i18n.t("widget.menu.name"),
  h: 7,
  w: 15,
  type: "MENU_WIDGET",
  icon: <MenuWidgetIcon />,
  keywords: ["Menu", "菜单"],
  sessionType: "NAVIGATION",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 1,
  defaults: {
    items,
    optionConfigureMode: "static",
    dataSources: "{{[]}}",
    selectedValues: "{{[]}}",
    mode: "horizontal",
    horizontalAlign: "flex-start",
    colorScheme: "blue",
    bgColor: "transparent",
    hoverColorScheme: "grayBlue",
    menuTitle: "ILLA",
    menuLogo:
      "https://cloud-api.illacloud.com/drive/f/0f3ef4da-7741-45f8-b054-57458c244214",
  },
}
