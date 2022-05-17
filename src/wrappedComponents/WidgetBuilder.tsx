import { CONTAINER_WIDGET_CONFIG, ContainerWidget } from "./ContainerWidget"
import { TEST_WIDGET_CONFIG, TestWidget } from "./TestWidget"
import { CANVAS_WIDGET_CONFIG, CanvasWidget } from "./CanvasWidget"

export type widgetType = "CONTAINER_WIDGET" | "CANVAS_WIDGET" | "TEST_WIDGET"

export const widgetBuilder = () => {
  const start = performance.now()
  const Config = {
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
    // BUTTON_WIDGET: {
    //   widget: ButtonWidget,
    //   config: BUTTON_WIDGET_CONFIG,
    // },
  }

  return Config
}
