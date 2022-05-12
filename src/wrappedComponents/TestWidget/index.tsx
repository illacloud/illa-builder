import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { BaseWidget } from "../BaseWidget"
import { TestWidgetProps } from "./interface"

export const TestWidget: FC<TestWidgetProps> = (props) => {
  const {
    className,
    children,
    dragDisabled,
    dslKey,
    id,
    parentId,
    topRow,
    bottomRow,
    leftColumn,
    rightColumn,
    parentRowSpace,
    parentColumnSpace,
  } = props


  return (
    <BaseWidget {...props}>
      <h1>Test</h1>
    </BaseWidget>
  )
}

TestWidget.displayName = "BaseWidget"
