import { ButtonWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const CONTAINER_WIDGET_CONFIG: WidgetConfig = {
  type: "CONTAINER_WIDGET",
  displayName: "container",
  widgetName: "容器",
  keywords: ["container", "容器"],
  icon: <ButtonWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {},
}
