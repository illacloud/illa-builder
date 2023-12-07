import ImageWidgetIcon from "@/assets/widgetCover/image.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const IMAGE_WIDGET_CONFIG: WidgetConfig = {
  type: "IMAGE_WIDGET",
  displayName: "image",
  widgetName: i18n.t("widget.image.name"),
  icon: <ImageWidgetIcon />,
  keywords: ["Image", "图片"],
  sessionType: "PRESENTATION",
  h: 16,
  w: 3,
  version: 0,
  defaults: {
    imageSrc:
      "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    imageRadius: "0px",
    hidden: false,
    objectFit: "cover",
    dynamicHeight: "fixed",
    horizontalAlign: "center",
  },
}
