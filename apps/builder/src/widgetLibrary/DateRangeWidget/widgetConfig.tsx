import { DateRangeWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const DATE_RANGE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_RANGE_WIDGET",
  displayName: "dateRange",
  widgetName: i18n.t("widget.date_range.name"),
  icon: <DateRangeWidgetIcon size="100%" />,
  keywords: ["Date Range", "日期范围选择器"],
  sessionType: "CALENDAR",
  w: 16,
  h: 5,
  defaults: {
    dateFormat: "YYYY-MM-DD",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    value: ["2022-05-02", "2022-05-03"],
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
  },
}
