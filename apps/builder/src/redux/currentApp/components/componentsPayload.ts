export interface UpdateComponentPositionPayload {
  oldParentNodeDisplayName: string
  newParentNodeDisplayName: string
  updateSlices: {
    displayName: string
    x: number
    y: number
    w: number
    h: number
  }[]
  columnNumberWhenDrag: number
  columnNumberWhenDrop: number
}
export interface LayoutInfo {
  w: number
  h: number
  x: number
  y: number
  z: number
  minW: number
  minH: number
}

export interface StatusInfo {
  isDragging: boolean
  isResizing: boolean
}

export interface UpdateComponentNodeLayoutInfoPayload {
  displayName: string
  layoutInfo: {
    x: number
    y: number
    h?: number
    w: number
  }
  statusInfo?: Partial<StatusInfo>
  parentNode: string
}

export interface BatchUpdateComponentNodeLayoutInfoPayload {
  displayName: string
  layoutInfo: {
    x: number
    y: number
    h: number
    w: number
  }
}

export interface UpdateComponentSlicePropsPayload {
  displayName: string
  propsSlice: {
    [key: string]: unknown
  }
}
