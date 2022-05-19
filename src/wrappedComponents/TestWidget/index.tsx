import { FC } from "react"
import { DraggableComponent } from "../DraggableComponent"
import { TestWidgetProps } from "./interface"

export const TEST_WIDGET_CONFIG = {
  type: "TEST_WIDGET",
  defaults: {
    rows: 28,
    columns: 24,
    widgetName: "test",
    version: "0.0.1",
  },
}

export const TestWidget: FC<TestWidgetProps> = (testWidgetProps) => {
  const { id, props } = testWidgetProps

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      Test Demo
    </div>
  )
}

TestWidget.displayName = "TestWidget"
