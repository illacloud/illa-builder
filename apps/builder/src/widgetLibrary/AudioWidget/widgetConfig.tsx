import AudioWidgetIcon from "@/assets/widgetCover/audio.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const AUDIO_WIDGET_CONFIG: WidgetConfig = {
  type: "AUDIO_WIDGET",
  displayName: "audio",
  widgetName: i18n.t("widget.audio.name"),
  keywords: ["Audio", "音频"],
  icon: <AudioWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 16,
  h: 7,
  version: 0,
  defaults: {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    hidden: false,
    autoPlay: false,
    loop: false,
    playing: false,
    muted: false,
    controls: true,
    volume: undefined,
  },
}
