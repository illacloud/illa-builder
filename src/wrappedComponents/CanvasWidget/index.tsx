import { FC } from "react"
import { CanvasWidgetProps } from "./interface"
import { ContainerWidget } from "@/wrappedComponents/ContainerWidget"
import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const CANVAS_WIDGET_CONFIG: ComponentModel = {
  type: "CANVAS_WIDGET",
  widgetName: "Canvas",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "COMMON",
  defaults: {
    rows: 0,
    columns: 0,
    width: "100%",
    height: "100%",
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
