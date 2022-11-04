export enum CONTAINER_TYPE {
  "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
  "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
}

export enum SECTION_POSITION {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
  "CENTER" = "CENTER",
  "FULL" = "FULL",
}
export interface ComponentNode {
  displayName: string
  parentNode: string | null
  showName: string
  isDragging: boolean
  isResizing: boolean
  childrenNode: ComponentNode[]
  type: string
  containerType: CONTAINER_TYPE
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
}

export interface RootComponentNode extends ComponentNode {
  type: "DOT_PANEL"
  props: {
    currentPageIndex: number
    pageSortedKey: string[]
  }
}

export interface PageNodeProps {
  canvasSize: "auto" | "fixed"
  canvasWidth: string
  layout: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
  hasLeft: boolean
  hasRight: boolean
  hasHeader: boolean
  hasFooter: boolean
  isLeftFixed: boolean
  isRightFixed: boolean
  isHeaderFixed: boolean
  isFooterFixed: boolean
  leftWidth: number
  rightWidth: number
  topHeight: number
  bottomHeight: number
}
export interface PageNode extends ComponentNode {
  type: "PAGE_NODE"
  props: PageNodeProps
}

export interface LeftOrRightSectionNodeProps {
  showFoldIcon: boolean
  currentViewIndex: number
  viewSortedKey: string[]
}

export interface HeaderOrBottomSectionNodeProps {
  currentViewIndex: number
  viewSortedKey: string[]
}

export interface SectionNode extends ComponentNode {
  type: "SECTION_NODE"
  props: LeftOrRightSectionNodeProps | HeaderOrBottomSectionNodeProps
}

export type ComponentsState = ComponentNode | null
export const ComponentsInitialState: ComponentsState = null

export interface DeleteComponentNodePayload {
  displayNames: string[]
}

export interface sortComponentNodeChildrenPayload {
  parentDisplayName: string
  newChildrenNode: ComponentNode[]
}

export interface UpdateComponentPropsPayload {
  displayName: string
  updateSlice: Record<string, any>
}
export interface UpdateComponentDisplayNamePayload {
  displayName: string
  newDisplayName: string
}

export interface UpdateComponentReflowPayload {
  parentDisplayName: string
  childNodes: ComponentNode[]
}

export interface CopyComponentPayload {
  oldComponentNode: ComponentNode
  newComponentNode: ComponentNode
}
