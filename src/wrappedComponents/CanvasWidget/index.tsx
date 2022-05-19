import { FC } from "react"
import { CanvasWidgetProps } from "./interface"
import { ContainerWidget } from "@/wrappedComponents/ContainerWidget"

export const CANVAS_WIDGET_CONFIG = {
  type: "CANVAS_WIDGET",
  widgetName: "Canvas",
  defaults: {
    version: "0.0.1",
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

  return <ContainerWidget {...canvasWidgetProp} />
}

CanvasWidget.displayName = "CanvasWidget"
