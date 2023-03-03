import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface UpdateComponentsShapePayload {
  isMove: boolean
  components: ComponentNode[]
}

export interface UpdateComponentContainerPayload {
  isMove: boolean
  updateSlice: {
    component: ComponentNode
    oldParentDisplayName: string
  }[]
}

export interface LayoutInfo {
  w: number
  h: number
  x: number
  y: number
  z: number
  unitW: number
  unitH: number
}

export interface StatusInfo {
  isDragging: boolean
  isResizing: boolean
}

export interface UpdateComponentNodeLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
  statusInfo?: Partial<StatusInfo>
  options?: Partial<{
    parentNode: string
  }>
}
