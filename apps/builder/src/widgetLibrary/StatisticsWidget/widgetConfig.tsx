import { ReactComponent as StatisticWidgetIcon } from "@/assets/widgetCover/statistic.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const STATISTICS_WIDGET_CONFIG: WidgetConfig = {
  type: "STATISTIC_WIDGET",
  displayName: "statistic",
  widgetName: i18n.t("widget.statistics.name"),
  icon: <StatisticWidgetIcon />,
  keywords: ["Statistic", "数值"],
  sessionType: "PRESENTATION",
  w: 12,
  h: 7,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    label: "Label",
    colorScheme: "grayBlue",
    positiveColorScheme: "green",
    negativeColorScheme: "red",
    hidden: false,
    positiveSign: "TbTrendingUp",
    negativeSign: "TbTrendingDown",
    secondaryPositiveSign: "TbTrendingUp",
    secondaryNegativeSign: "TbTrendingDown",
    textAlign: "start",
    primaryValue: "{{0}}",
    decimalPlace: "{{2}}",
  },
}
