import { CONTAINER_WIDGET_CONFIG, ContainerWidget } from "./ContainerWidget"
import { TEST_WIDGET_CONFIG, TestWidget } from "./TestWidget"
import { CANVAS_WIDGET_CONFIG, CanvasWidget } from "./CanvasWidget"
import Text, { TEXT_WIDGET_CONFIG } from "./Text"
import Image, { IMAGE_WIDGET_CONFIG } from "./Image"

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
    widget: Text,
    config: TEXT_WIDGET_CONFIG,
  },
  IMAGE_WIDGET: {
    widget: Image,
    config: IMAGE_WIDGET_CONFIG,
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
