import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface TransformWidgetProps {
  displayName: string
  widgetType: string
  parentNodeDisplayName: string
  columnNumber?: number
}

export interface TransformWidgetWrapperWithJsonProps {
  componentNode: ComponentNode
  unitW: number
}
