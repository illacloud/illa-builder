import { ReactComponent as VideoWidgetIcon } from "@/assets/widgetCover/video.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const AUDIO_WIDGET_CONFIG: WidgetConfig = {
  type: "AUDIO_WIDGET",
  displayName: "audio",
  widgetName: i18n.t("widget.audio.name"),
  keywords: ["Audio", "音频"],
  icon: <VideoWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 40,
  h: 10,
  defaults: {
    url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    hidden: false,
    autoPlay: false,
    loop: false,
    playing: false,
    muted: false,
    controls: true,
    volume: undefined,
  },
}
