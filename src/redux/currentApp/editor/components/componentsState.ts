export type ContainerType = "EDITOR_DOT_PANEL" | "EDITOR_SCALE_SQUARE"

export interface ComponentNode {
  displayName: string
  parentNode: string | null
  showName: string
  error: boolean
  isDragging: boolean
  childrenNode: ComponentNode[]
  type: string
  containerType: ContainerType
  verticalResize: boolean
  h: number
  w: number
  minH: number
  minW: number
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

export interface ComponentsState {
  rootDsl: ComponentNode | null
}

export const ComponentsInitialState: ComponentsState = {
  rootDsl: null,
}

export interface DeleteComponentNodePayload {
  displayName: string
  parentDisplayName: string
}

export interface UpdateComponentPropsPayload {
  displayName: string
  updateSlice: Record<string, any>
}
