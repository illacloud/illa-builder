import { FC, useCallback, useEffect, useRef, useState } from "react"
import { BaseWidget } from "../BaseWidget"
import { ContainerWidgetProps } from "./interface"

export const ContainerWidget: FC<ContainerWidgetProps> = (props) => {
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

ContainerWidget.displayName = "ContainerWidget"
