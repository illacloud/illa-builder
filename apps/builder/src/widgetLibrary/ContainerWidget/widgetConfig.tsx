import { v4 } from "uuid"
import { ReactComponent as ContainerWidgetIcon } from "@/assets/widgetCover/container.svg"
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
  sessionType: "PRESENTATION",
  w: 20,
  h: 40,
  childrenNode: [
    BasicContainerConfig,
    BasicContainerConfig,
    BasicContainerConfig,
  ],
  defaults: {
    viewList: defaultListView,
    currentIndex: 0,
    currentKey: "View 1",
    borderColor: "#ffffffff",
    backgroundColor: "#ffffffff",
    radius: "4px",
    borderWidth: "1px",
    shadow: "small",
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
