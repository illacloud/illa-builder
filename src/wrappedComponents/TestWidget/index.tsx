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

export const TestWidget: FC<TestWidgetProps> = (props) => {
  const {
    className,
    children,
    id,
    parentId,
  } = props


  return (
    <BaseWidget {...props}>
      <h1>Test</h1>
    </BaseWidget>
  )
}

TestWidget.displayName = "TestWidget"
