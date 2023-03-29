import { ReactComponent as SelectWidgetIcon } from "@/assets/widgetCover/select.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RANGE_SLIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "RANGE_SLIDER_WIDGET",
  displayName: "rangeSlider",
  widgetName: i18n.t("widget.rangeSlider.name"), // todo: 翻译
  icon: <SelectWidgetIcon />,
  keywords: ["Range Slider", "范围滑动输入条"],
  sessionType: "INPUTS",
  w: 25,
  h: 10,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    startValue: "{{3}}",
    endValue: "{{7}}",
    min: "{{0}}",
    max: "{{10}}",
    step: "{{1}}",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hideOutput: false,
    disabled: false,
    colorScheme: "blue",
    hidden: false,
    formDataKey: "slider",
  },
}
