import { SwitchWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const UPLOAD_WIDGET_CONFIG: WidgetConfig = {
  displayName: "upload",
  widgetName: "widget.upload.name",
  h: 5,
  w: 10,
  type: "UPLOAD_WIDGET",
  icon: <SwitchWidgetIcon size="100%" />,
  sessionType: "SELECT",
  defaults: {
    colorScheme: "blue",
    hidden: false,
  },
}
