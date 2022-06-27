export type ContainerType = "EDITOR_DOT_PANEL" | "EDITOR_SCALE_SQUARE"

export interface ComponentNode {
  displayName: string
  parentNode: string | null
  error: boolean
  isDragging: boolean
  childrenNode: {
    [key: string]: ComponentNode
  } | null
  type: string | null
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
  rootDsl: {
    displayName: "root",
    parentNode: null,
    childrenNode: null,
    type: null,
    containerType: "EDITOR_DOT_PANEL",
    verticalResize: true,
    h: 0,
    w: 0,
    x: -1,
    y: -1,
  } as ComponentNode,
}

export interface deleteComponentNodePayload {
  displayName: string
  parentDisplayName: string
}

export interface updateComponentPropsPayload {
  displayName: string
  newProps: Record<string, any>
}

export interface updateComponentDynamicStringsPayload {
  displayName: string
  dynamicStrings: string[]
}
