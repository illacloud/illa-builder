import { PADDING_MODE } from "@illa-public/public-types"
import { v4 } from "uuid"
import ContainerWidgetIcon from "@/assets/widgetCover/container.svg?react"
import i18n from "@/i18n/config"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const defaultListView = [
  { id: v4(), key: "View 1", label: "View 1" },
  { id: v4(), key: "View 2", label: "View 2" },
  { id: v4(), key: "View 3", label: "View 3" },
]

export const CONTAINER_WIDGET_CONFIG: WidgetConfig = {
  type: "CONTAINER_WIDGET",
  displayName: "container",
  widgetName: i18n.t("widget.container.name"),
  keywords: ["container", "容器"],
  icon: <ContainerWidgetIcon />,
  sessionType: "CONTAINER",
  w: 10,
  h: 18,
  version: 0,
  childrenNode: [
    BasicContainerConfig,
    BasicContainerConfig,
    BasicContainerConfig,
  ],
  defaults: {
    viewList: defaultListView,
    currentIndex: 0,
    currentKey: "View 1",
    backgroundColor: "#ffffffff",
    radius: "4px",
    shadow: "small",
    dynamicHeight: "auto",
    resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
    padding: {
      mode: PADDING_MODE.ALL,
      size: "24",
    },
  },
}
