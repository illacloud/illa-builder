import { ReactComponent as ButtonWidgetIcon } from "@/assets/widgetCover/button.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CAROUSEL_WIDGET_CONFIG: WidgetConfig = {
  type: "CAROUSEL_WIDGET",
  displayName: "carousel",
  widgetName: i18n.t("widget.button.name"),
  keywords: ["Carousel", "按钮"],
  icon: <ButtonWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {
    text: i18n.t("widget.button.default_text"),
    variant: "fill",
    colorScheme: "blue",
    hidden: false,
  },
}
