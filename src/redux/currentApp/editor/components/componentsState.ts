export type ContainerType =
  | "EDITOR_DOT_PANEL"
  | "EDITOR_SCALE_SQUARE"
  | "EDITOR_DOTTED_LINE_SQUARE"

export interface ComponentNode {
  displayName: string
  parentNode: string | null
  childrenNode: {
    [key: string]: ComponentNode
  } | null
  type: string | null
  containerType: ContainerType
  h: number
  w: number
  // default -1
  x: number
  // default -1
  y: number
  props: {
    [key: string]: any
  } | null
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
    h: 0,
    w: 0,
    x: -1,
    y: -1,
  } as ComponentNode,
}

export interface updateComponentPropsPayload {
  displayName: string
  newProps: Record<string, any>
}
