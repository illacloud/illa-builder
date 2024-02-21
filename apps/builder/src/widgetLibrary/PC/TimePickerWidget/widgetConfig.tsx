import TimePickerWidgetIcon from "@/assets/widgetCover/timePicker.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TIME_PICKER_WIDGET_CONFIG: WidgetConfig = {
  type: "TIME_PICKER_WIDGET",
  displayName: "timePicker",
  widgetName: i18n.t("widget.time_picker.name"),
  keywords: ["Time Picker", "时间选择器"],
  icon: <TimePickerWidgetIcon />,
  sessionType: "CALENDAR",
  w: 6,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    placeholder: i18n.t(
      "editor.inspect.setter_default_value.time_picker.select_time",
    ),
    format: "HH:mm:ss",
    minuteStep: "{{15}}",
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
    showClear: true,
    formDataKey: "timePicker",
  },
}
