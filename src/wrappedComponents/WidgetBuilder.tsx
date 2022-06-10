import { CONTAINER_WIDGET_CONFIG, ContainerWidget } from "./ContainerWidget"
import { TEST_WIDGET_CONFIG, TestWidget } from "./TestWidget"
import { CANVAS_WIDGET_CONFIG, CanvasWidget } from "./CanvasWidget"
import { TEXT_WIDGET_CONFIG, TextWidget, TEXT_PANEL_CONFIG } from "./Text"
import { IMAGE_WIDGET_CONFIG, ImageWidget, IMAGE_PANEL_CONFIG } from "./Image"
import {
  SWITCH_WIDGET_CONFIG,
  SwitchWidget,
  SWITCH_PANEL_CONFIG,
} from "./Switch"
import {
  BUTTON_WIDGET_CONFIG,
  ButtonWidget,
  BUTTON_PANEL_CONFIG,
} from "./Button"
import {
  SELECT_WIDGET_CONFIG,
  SelectWidget,
  SELECT_PANEL_CONFIG,
} from "./Select"
import { INPUT_WIDGET_CONFIG, InputWidget, INPUT_PANEL_CONFIG } from "./Input"
import { WidgetConfigs } from "./interface"
import {
  RADIO_GROUP_WIDGET_CONFIG,
  RADIO_GROUP_PANEL_CONFIG,
  RadioGroupWidget,
} from "./RadioGroup"
import {
  SEGMENTED_CONTROL_PANEL_CONFIG,
  SEGMENTED_CONTROL_WIDGET_CONFIG,
  SegmentedControlWidget,
} from "@/wrappedComponents/SegmentedControl"

const WidgetConfig: WidgetConfigs = {
  CONTAINER_WIDGET: {
    widget: ContainerWidget,
    config: CONTAINER_WIDGET_CONFIG,
    panelConfig: [],
  },
  CANVAS_WIDGET: {
    widget: CanvasWidget,
    config: CANVAS_WIDGET_CONFIG,
    panelConfig: [],
  },
  TEST_WIDGET: {
    widget: TestWidget,
    config: TEST_WIDGET_CONFIG,
    panelConfig: [],
  },
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
  SEGMENTED_CONTROL_WIDGET: {
    widget: SegmentedControlWidget,
    config: SEGMENTED_CONTROL_WIDGET_CONFIG,
    panelConfig: SEGMENTED_CONTROL_PANEL_CONFIG,
  },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  const start = performance.now()
  return WidgetConfig[type]
}
