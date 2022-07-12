import { ImageWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "image",
  widgetName: "widget.image.name",
  icon: <ImageWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  h: 15,
  w: 10,
  defaults: {
    imageSrc: "https://placekitten.com/400/300",
    radius: "0px",
  },
}
