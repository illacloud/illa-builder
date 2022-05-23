import { FC } from "react"
import { TestWidgetProps } from "./interface"
import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const TEST_WIDGET_CONFIG: ComponentModel = {
  type: "TEST_WIDGET",
  widgetName: "test",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "COMMON",
  defaults: {
    rows: 28,
    columns: 24,
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
