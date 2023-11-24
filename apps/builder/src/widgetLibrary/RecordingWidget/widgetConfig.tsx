import RecordingWidgetIcon from "@/assets/widgetCover/recording.svg?react"
import i18n from "@/i18n/config"
import {
  DefaultClearText,
  DefaultStartText,
  DefaultStopText,
} from "@/widgetLibrary/RecordingWidget/constants"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RECORDING_WIDGET_CONFIG: WidgetConfig = {
  type: "RECORDING_WIDGET",
  displayName: "recording",
  widgetName: i18n.t("widget.recording.name"),
  icon: <RecordingWidgetIcon />,
  keywords: ["Recording", "录音"],
  sessionType: "INPUTS",
  w: 10,
  h: 7,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    value: "",
    dataURI: "",
    isRecording: false,
    recordTime: 0,
    maxDuration: "{{10000}}",
    minDuration: "{{0}}",
    formDataKey: "recording",
    startText: DefaultStartText,
    stopText: DefaultStopText,
    clearText: DefaultClearText,
  },
}
