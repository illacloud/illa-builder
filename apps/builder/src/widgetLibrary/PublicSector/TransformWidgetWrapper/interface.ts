import { ComponentTreeNode } from "@illa-public/public-types"

export interface TransformWidgetProps {
  displayName: string
  widgetType: string
  parentNodeDisplayName: string
  columnNumber?: number
}

export interface TransformWidgetWrapperWithJsonProps {
  componentNode: ComponentTreeNode
  unitW: number
}
