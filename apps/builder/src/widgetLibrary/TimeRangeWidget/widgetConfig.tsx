import RangeTimePickerWidgetIcon from "@/assets/widgetCover/rangeTimePicker.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TIME_RANGE_WIDGET_CONFIG: WidgetConfig = {
  type: "TIME_RANGE_WIDGET",
  displayName: "rangeTime",
  widgetName: i18n.t("widget.time_range.name"),
  keywords: ["Range Time", "时间范围选择器"],
  icon: <RangeTimePickerWidgetIcon />,
  sessionType: "CALENDAR",
  w: 10,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    format: "HH:mm:ss",
    minuteStep: "{{15}}",
    startPlaceholder: i18n.t(
      "editor.inspect.setter_default_value.time_range.start_placeholder",
    ),
    endPlaceholder: i18n.t(
      "editor.inspect.setter_default_value.time_range.end_placeholder",
    ),
    startTime: "00:00:00",
    endTime: "23:59:59",
    colorScheme: "blue",
    label: "Label",
    value: ["", ""],
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
    showClear: true,
    formDataKey: "timeRange",
  },
}
