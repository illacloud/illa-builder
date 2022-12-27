export enum CONTAINER_TYPE {
  "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
  "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
  "EDITOR_PAGE_SQUARE" = "EDITOR_PAGE_SQUARE",
  "EDITOR_LAYOUT_SQUARE" = "EDITOR_LAYOUT_SQUARE",
}

export enum SECTION_POSITION {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
  "CENTER" = "CENTER",
  "FULL" = "FULL",
  "NONE" = "NONE",
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

export interface RootComponentNodeProps {
  currentPageIndex: number
  pageSortedKey: string[]
  homepageDisplayName?: string

  viewportWidth?: number
  viewportHeight?: number
}

export interface RootComponentNode extends ComponentNode {
  type: "DOT_PANEL"
  props: RootComponentNodeProps
}

export interface PageNodeProps {
  canvasSize: "auto" | "fixed"
  canvasWidth: number
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
  showLeftFoldIcon: boolean
  showRightFoldIcon: boolean
  leftColumns?: number
  rightColumns?: number
  bodyColumns?: number
  headerColumns?: number
  footerColumns?: number
}
export interface PageNode extends ComponentNode {
  type: "PAGE_NODE"
  props: PageNodeProps
}

export interface SectionViewShape {
  viewDisplayName: string
  key: string
  id: string
  path: string
}

export interface BaseSectionNodeProps {
  currentViewIndex: number
  viewSortedKey: string[]
  sectionViewConfigs: SectionViewShape[]
  defaultViewKey: string
}

export interface LeftOrRightSectionNodeProps extends BaseSectionNodeProps {
  showFoldIcon: boolean
}

export type SectionNodeProps =
  | LeftOrRightSectionNodeProps
  | BaseSectionNodeProps

export interface SectionNode extends ComponentNode {
  type: "SECTION_NODE"
  props: SectionNodeProps
}

export type ComponentsState = ComponentNode | null
export const ComponentsInitialState: ComponentsState = null

export interface DeleteComponentNodePayload {
  displayNames: string[]
}

export interface DeletePageNodePayload {
  displayName: string
  originPageSortedKey: string[]
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

export interface UpdateTargetPageLayoutPayload {
  pageName: string
  layout: "default" | "presetA" | "presetB" | "presetC" | "presetD" | "presetE"
}

export interface UpdateTargetPagePropsPayload {
  pageName: string
  newProps: Partial<PageNodeProps>
  options?: Record<string, unknown>
}

export interface UpdateRootNodePropsPayload {}

export interface DeleteTargetPageSectionPayload {
  pageName: string
  deleteSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
  options: Record<string, any>
}

export interface AddTargetPageSectionPayload {
  pageName: string
  addedSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
  options: Record<string, any>
}

export interface AddSectionViewPayload {
  parentNodeName: string
  containerNode: ComponentNode
  newSectionViewConfig: SectionViewShape
}

export interface DeleteSectionViewPayload {
  viewDisplayName: string
  parentNodeName: string
  originPageSortedKey: string[]
}

export interface UpdateSectionViewPropsPayload {
  parentNodeName: string
  newProps: Record<string, any>
}
