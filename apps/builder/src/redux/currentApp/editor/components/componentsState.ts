export type ContainerType = "EDITOR_DOT_PANEL" | "EDITOR_SCALE_SQUARE"

export interface ComponentNode {
  displayName: string
  parentNode: string | null
  showName: string
  isDragging: boolean
  isResizing: boolean
  childrenNode: ComponentNode[]
  type: string
  containerType: ContainerType
  verticalResize: boolean
  h: number
  w: number
  minH: number
  minW: number
  // default 0
  unitW: number
  // default 0
  unitH: number
  // default -1
  x: number
  // default -1
  y: number
  // default 0
  z: number
  props: {
    [key: string]: any
  } | null
  panelConfig?: {
    dynamicStrings: string[]
  }
}

export type ComponentsState = ComponentNode | null
export const ComponentsInitialState: ComponentsState = null

export interface DeleteComponentNodePayload {
  displayNames: string[]
}

export interface UpdateComponentPropsPayload {
  displayName: string
  updateSlice: Record<string, any>
}

export interface ResetComponentPropsPayload {
  displayName: string
  resetSlice: Record<string, any>
}

export interface UpdateComponentDisplayNamePayload {
  displayName: string
  newDisplayName: string
}
