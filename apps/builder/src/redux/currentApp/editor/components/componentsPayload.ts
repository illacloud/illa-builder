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
  componentNodeList: ComponentNode[]
  offsetX: number
  offsetY: number
}

export interface ComponentCopyDisplayNamesPayload {
  displayNameList: string[]
  offsetX: number
  offsetY: number
}

export interface ComponentDropPayload {
  isMove: boolean
  componentNode: ComponentNode
}
