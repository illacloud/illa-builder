import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { BaseWidget } from "../BaseWidget"
import { TestWidgetProps } from "./interface"

export const TEST_WIDGET_CONFIG = {
  type: "TEST_WIDGET",
  version: "0.0.1",
  defaults: {
    rows: 28,
    columns: 24,
    widgetName: "Video",
  },
}

export const TestWidget: FC<TestWidgetProps> = (testWidgetProps) => {
  const { className, children, id, props } = testWidgetProps

  return (
    <BaseWidget {...testWidgetProps}>
      <h1
        id={id}
        style={{
          position: "absolute",
          left: props.leftColumn,
          top: props.topRow,
          right: props.rightColumn,
          bottom: props.bottomRow,
        }}
      >
        Test
      </h1>
    </BaseWidget>
  )
}

TestWidget.displayName = "TestWidget"
