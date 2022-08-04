import { ImageWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "image",
  widgetName: i18n.t("widget.image.name"),
  icon: <ImageWidgetIcon size="100%" />,
  keywords: ["Image", "图片"],
  sessionType: "PRESENTATION",
  h: 16,
  w: 6,
  defaults: {
    imageSrc: "https://placekitten.com/400/300",
    radius: "0px",
    hidden: false,
  },
}
