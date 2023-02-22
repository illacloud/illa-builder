import { ReactComponent as VideoWidgetIcon } from "@/assets/widgetCover/video.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const VIDEO_WIDGET_CONFIG: WidgetConfig = {
  type: "VIDEO_WIDGET",
  displayName: "video",
  widgetName: i18n.t("widget.video.name"),
  keywords: ["Video", "按钮"],
  icon: <VideoWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 32,
  h: 25,
  defaults: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    hidden: false,
    autoPlay: false,
    loop: false,
    playing: false,
    volume: undefined,
  },
}
