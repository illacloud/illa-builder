import { ReactComponent as VideoWidgetIcon } from "@/assets/widgetCover/video.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const VIDEO_WIDGET_CONFIG: WidgetConfig = {
  type: "VIDEO_WIDGET",
  displayName: "video",
  widgetName: i18n.t("widget.video.name"),
  keywords: ["Video", "视频"],
  icon: <VideoWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 32,
  h: 25,
  defaults: {
    url: "https://youtu.be/8sUovZlBh_M",
    hidden: false,
    autoPlay: false,
    loop: false,
    playing: false,
    muted: false,
    controls: true,
    volume: undefined,
  },
}
