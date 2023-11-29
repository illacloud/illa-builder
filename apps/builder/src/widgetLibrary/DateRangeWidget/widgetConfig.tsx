import DateRangeWidgetIcon from "@/assets/widgetCover/dateRange.svg?react"
import i18n from "@/i18n/config"
import { TEMPLATE_DISPLAYNAME_KEY } from "@/utils/generators/generateComponentNode"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const DATE_RANGE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_RANGE_WIDGET",
  displayName: "dateRange",
  widgetName: i18n.t("widget.date_range.name"),
  icon: <DateRangeWidgetIcon />,
  keywords: ["Date Range", "日期范围选择器"],
  sessionType: "CALENDAR",
  w: 8,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    dateFormat: "YYYY-MM-DD",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
    formDataKey: "radioButton",
    value: [
      `{{${TEMPLATE_DISPLAYNAME_KEY}.startValue}}`,
      `{{${TEMPLATE_DISPLAYNAME_KEY}.endValue}}`,
    ],
    $dynamicAttrPaths: ["value[0]", "value[1]"],
  },
}
