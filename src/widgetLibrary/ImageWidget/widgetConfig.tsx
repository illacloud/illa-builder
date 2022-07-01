import { ImageWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "Image",
  widgetName: i18n.t("widget.image.name"),
  icon: <ImageWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  h: 15,
  w: 10,
  defaults: {
    imageSrc: "https://placekitten.com/400/300",
    styles: {
      radius: "0px",
    },
  },
}
