import SliderWidgetIcon from "@/assets/widgetCover/slider.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const SLIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "SLIDER_WIDGET",
  displayName: "slider",
  widgetName: i18n.t("widget.slider.name"),
  icon: <SliderWidgetIcon />,
  keywords: ["Slider", "滑动输入条"],
  sessionType: "INPUTS",
  w: 10,
  h: 10,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    value: undefined,
    defaultValue: "{{2}}",
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
