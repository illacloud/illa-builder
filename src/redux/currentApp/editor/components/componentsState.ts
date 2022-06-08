export interface ComponentNode {
  displayName: string
  parentNode: string | null
  childrenNode: string[] | null
  type: string
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

export const ComponentsInitialState = {
  rootDsl: null,
}
