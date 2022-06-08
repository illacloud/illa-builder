import { TEXT_PANEL_CONFIG, TEXT_WIDGET_CONFIG, TextWidget } from "./Text"
import { IMAGE_PANEL_CONFIG, IMAGE_WIDGET_CONFIG, ImageWidget } from "./Image"
import {
  SWITCH_PANEL_CONFIG,
  SWITCH_WIDGET_CONFIG,
  SwitchWidget,
} from "./Switch"
import {
  BUTTON_PANEL_CONFIG,
  BUTTON_WIDGET_CONFIG,
  ButtonWidget,
} from "./Button"
import {
  SELECT_PANEL_CONFIG,
  SELECT_WIDGET_CONFIG,
  SelectWidget,
} from "./Select"
import { INPUT_PANEL_CONFIG, INPUT_WIDGET_CONFIG, InputWidget } from "./Input"
import { WidgetConfigs } from "./interface"
import {
  RADIO_GROUP_PANEL_CONFIG,
  RADIO_GROUP_WIDGET_CONFIG,
  RadioGroupWidget,
} from "./RadioGroup"
import {
  DATE_PANEL_CONFIG,
  DATE_WIDGET_CONFIG,
  DateWidget,
} from "@/wrappedComponents/Date"
import {
  DATE_TIME_PANEL_CONFIG,
  DATE_TIME_WIDGET_CONFIG,
  DateTimeWidget,
} from "@/wrappedComponents/DateTime"
import {
  DATE_RANGE_PANEL_CONFIG,
  DATE_RANGE_WIDGET_CONFIG,
  DateRangeWidget,
} from "@/wrappedComponents/DateRange"

const WidgetConfig: WidgetConfigs = {
  TEXT_WIDGET: {
    widget: TextWidget,
    config: TEXT_WIDGET_CONFIG,
    panelConfig: TEXT_PANEL_CONFIG,
  },
  IMAGE_WIDGET: {
    widget: ImageWidget,
    config: IMAGE_WIDGET_CONFIG,
    panelConfig: IMAGE_PANEL_CONFIG,
  },
  SWITCH_WIDGET: {
    widget: SwitchWidget,
    config: SWITCH_WIDGET_CONFIG,
    panelConfig: SWITCH_PANEL_CONFIG,
  },
  BUTTON_WIDGET: {
    widget: ButtonWidget,
    config: BUTTON_WIDGET_CONFIG,
    panelConfig: BUTTON_PANEL_CONFIG,
  },
  SELECT_WIDGET: {
    widget: SelectWidget,
    config: SELECT_WIDGET_CONFIG,
    panelConfig: SELECT_PANEL_CONFIG,
  },
  RADIO_GROUP_WIDGET: {
    widget: RadioGroupWidget,
    config: RADIO_GROUP_WIDGET_CONFIG,
    panelConfig: RADIO_GROUP_PANEL_CONFIG,
  },
  INPUT_WIDGET: {
    widget: InputWidget,
    config: INPUT_WIDGET_CONFIG,
    panelConfig: INPUT_PANEL_CONFIG,
  },
  DATE_WIDGET: {
    widget: DateWidget,
    config: DATE_WIDGET_CONFIG,
    panelConfig: DATE_PANEL_CONFIG,
  },
  DATE_RANGE_WIDGET: {
    widget: DateRangeWidget,
    config: DATE_RANGE_WIDGET_CONFIG,
    panelConfig: DATE_RANGE_PANEL_CONFIG,
  },
  DATE_TIME_WIDGET: {
    widget: DateTimeWidget,
    config: DATE_TIME_WIDGET_CONFIG,
    panelConfig: DATE_TIME_PANEL_CONFIG,
  },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type]
}
