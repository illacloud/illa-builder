import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface ComponentDraggingPayload {
  displayName: string
  isDragging: boolean
}

export interface ComponentResizePayload {
  displayName: string
  isResizing: boolean
}

export interface ComponentCopyPayload {
  newDisplayName: string
  componentNode: ComponentNode
}
