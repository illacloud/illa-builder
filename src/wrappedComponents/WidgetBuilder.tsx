import { CONTAINER_WIDGET_CONFIG, ContainerWidget } from "./ContainerWidget"
import { TEST_WIDGET_CONFIG, TestWidget } from "./TestWidget"
import { CANVAS_WIDGET_CONFIG, CanvasWidget } from "./CanvasWidget"
import { TEXT_WIDGET_CONFIG, WrappedTextWidget } from "./Text"
import { IMAGE_WIDGET_CONFIG, WrappedImageWidget } from "./Image"
import { SWITCH_WIDGET_CONFIG, WrappedSwitchWidget } from "./Switch"
import { BUTTON_WIDGET_CONFIG, WrappedButtonWidget } from "./Button"
import { SELECT_WIDGET_CONFIG, WrappedSelectWidget } from "./Select"

const WidgetConfig = {
  CONTAINER_WIDGET: {
    widget: ContainerWidget,
    config: CONTAINER_WIDGET_CONFIG,
  },
  CANVAS_WIDGET: {
    widget: CanvasWidget,
    config: CANVAS_WIDGET_CONFIG,
  },
  TEST_WIDGET: {
    widget: TestWidget,
    config: TEST_WIDGET_CONFIG,
  },
  TEXT_WIDGET: {
    widget: WrappedTextWidget,
    config: TEXT_WIDGET_CONFIG,
  },
  IMAGE_WIDGET: {
    widget: WrappedImageWidget,
    config: IMAGE_WIDGET_CONFIG,
  },
  SWITCH_WIDGET: {
    widget: WrappedSwitchWidget,
    config: SWITCH_WIDGET_CONFIG,
  },
  BUTTON_WIDGET: {
    widget: WrappedButtonWidget,
    config: BUTTON_WIDGET_CONFIG,
  },
  SELECT_WIDGET: {
    widget: WrappedSelectWidget,
    config: SELECT_WIDGET_CONFIG,
  },

  // BUTTON_WIDGET: {
  //   widget: ButtonWidget,
  //   config: BUTTON_WIDGET_CONFIG,
  // },
}

export type WidgetType = keyof typeof WidgetConfig

export const WidgetTypeList = Object.keys(WidgetConfig)

export const widgetBuilder = (type: WidgetType) => {
  const start = performance.now()
  return WidgetConfig[type]
}
