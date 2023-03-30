import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export const AUDIO_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.play",
      ),
      value: "play",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.pause",
      ),
      value: "pause",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.loaded",
      ),
      value: "loaded",
    },
    {
      label: i18n.t(
        "editor.inspect.setter_content.widget_action_type_name.ended",
      ),
      value: "ended",
    },
  ],
  methods: [
    "play",
    "pause",
    "setAudioUrl",
    "setVolume",
    "setSpeed",
    "setLoop",
    "seekTo",
    "mute",
  ],
}
