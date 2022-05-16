import { FC, useCallback, useEffect, useRef, useState } from "react"
import { CanvasWidgetProps } from "./interface"
import { ContainerWidget } from "../ContainerWidget"
import { widgetBuilder } from "../WidgetBuilder"

export const CANVAS_WIDGET_CONFIG = {
  type: "CANVAS_WIDGET",
  version: "0.0.1",
  defaults: {
    rows: 0,
    columns: 0,
    width: "100%",
    height: "100%",
    widgetName: "Canvas",
    containerStyle: "none",
    borderWidth: "0",
    borderRadius: "0",
    children: [],
    dragDisabled: true,
  },
}

export const CanvasWidget: FC<CanvasWidgetProps> = (canvasWidgetProp) => {
  const { children, props, id, type } = canvasWidgetProp
  const { defaults } = widgetBuilder()[type].config
  const currentProps = {
    ...canvasWidgetProp,
    props: {
      ...defaults,
      ...props,
    },
  }
  console.log(currentProps, "CanvasWidget")

  return <ContainerWidget {...currentProps} />
}

CanvasWidget.displayName = "CanvasWidget"
