import IFrameWidgetIcon from "@/assets/widgetCover/iframe.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const IFRAME_WIDGET_CONFIG: WidgetConfig = {
  displayName: "iframe",
  widgetName: i18n.t("widget.iframe.name"),
  h: 40,
  w: 16,
  type: "IFRAME_WIDGET",
  icon: <IFrameWidgetIcon />,
  keywords: ["iframe", "內联框架"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.ALL,
  version: 0,
  defaults: {
    src: "https://www.nasa.gov/",
  },
}
