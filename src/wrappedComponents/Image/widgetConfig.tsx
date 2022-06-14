import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "Image",
  widgetName: i18n.t("widget.image.name"),
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  h: 10,
  w: 5,
  defaults: {
    src: "https://placekitten.com/400/300",
  },
}
