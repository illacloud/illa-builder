import { ReactComponent as ContainerWidgetIcon } from "@/assets/widgetIcon/container.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"
import { v4 } from "uuid"

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
  defaults: {
    viewList: defaultListView,
    currentViewIndex: 0,
    currentViewKey: "View 1",
    viewComponentsArray: [[], [], []],
    borderColor: "#ffffffff",
    backgroundColor: "#ffffffff",
    radius: "4px",
    borderWidth: "4px",
    shadow: "small",
  },
}
