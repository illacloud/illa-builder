import { CONTAINER_WIDGET_CONFIG, ContainerWidget } from "./ContainerWidget"
import { TEST_WIDGET_CONFIG, TestWidget } from "./TestWidget"
import { CANVAS_WIDGET_CONFIG, CanvasWidget } from "./CanvasWidget"
import { TEXT_WIDGET_CONFIG, TextWidget, TextPanelConfig } from "./Text"
import { IMAGE_WIDGET_CONFIG, ImageWidget, ImagePanelConfig } from "./Image"
import { SWITCH_WIDGET_CONFIG, SwitchWidget, SwitchPanelConfig } from "./Switch"
import { BUTTON_WIDGET_CONFIG, ButtonWidget, ButtonPanelConfig } from "./Button"
import { SELECT_WIDGET_CONFIG, SelectWidget, SelectPanelConfig } from "./Select"
import { WidgetConfigs } from "./interface"
import {
  RADIO_GROUP_WIDGET_CONFIG,
  RadioGroupPanelConfig,
  RadioGroupWidget,
} from "./RadioGroup"

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
    panelConfig: TextPanelConfig,
  },
  IMAGE_WIDGET: {
    widget: ImageWidget,
    config: IMAGE_WIDGET_CONFIG,
    panelConfig: ImagePanelConfig,
  },
  SWITCH_WIDGET: {
    widget: SwitchWidget,
    config: SWITCH_WIDGET_CONFIG,
    panelConfig: SwitchPanelConfig,
  },
  BUTTON_WIDGET: {
    widget: ButtonWidget,
    config: BUTTON_WIDGET_CONFIG,
    panelConfig: ButtonPanelConfig,
  },
  SELECT_WIDGET: {
    widget: SelectWidget,
    config: SELECT_WIDGET_CONFIG,
    panelConfig: SelectPanelConfig,
  },
  RADIO_GROUP_WIDGET: {
    widget: RadioGroupWidget,
    config: RADIO_GROUP_WIDGET_CONFIG,
    panelConfig: RadioGroupPanelConfig,
  },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  const start = performance.now()
  return WidgetConfig[type]
}
