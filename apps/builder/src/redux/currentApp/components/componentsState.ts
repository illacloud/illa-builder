import {
  ComponentMapNode,
  ComponentTreeNode,
  SECTION_POSITION,
  SectionViewShape,
} from "@illa-public/public-types"

export type ViewportSizeType = "fluid" | "desktop" | "tablet" | "custom"

export interface RootComponentNodeProps {
  currentPageIndex: number
  pageSortedKey: string[]
  homepageDisplayName?: string
  viewportWidth?: number
  viewportHeight?: number
  viewportSizeType?: ViewportSizeType
  currentSubPagePath?: string
}

export interface RootComponentNode extends ComponentMapNode {
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

export interface PageNode extends ComponentTreeNode {
  type: "PAGE_NODE"
  props: PageNodeProps
}

export type ComponentsState = Record<string, ComponentMapNode>
export const ComponentsInitialState: ComponentsState = {}

export interface DeleteComponentNodePayload {
  displayNames: string[]
  source?: "keyboard" | "manage_delete" | "left_delete" | "left_multi_delete"
}

export interface DeletePageNodePayload {
  displayName: string
  originPageSortedKey: string[]
}

export interface SortComponentNodeChildrenPayload {
  parentDisplayName: string
  newChildrenNode: string[]
}

export interface UpdateComponentPropsPayload {
  displayName: string
  updateSlice: Record<string, unknown>
  notUseUndoRedo?: boolean
}

export interface AddContainerComponentViewsReducerPayload {
  displayName: string
  containerDisplayName: string
  linkedDisplayName?: string
  addedViewItem: {
    id: string
    key: string
    label: string
    disabled?: string
    hidden?: string
  }[]
  addComponent: ComponentTreeNode
}

export interface DeleteContainerComponentViewsReducerPayload {
  displayName: string
  containerDisplayName: string
  linkedDisplayName?: string
  deletedIndex: number
}
export interface UpdateComponentDisplayNamePayload {
  displayName: string
  newDisplayName: string
}

export interface UpdateComponentReflowPayload {
  parentDisplayName: string
  childNodes: ComponentMapNode[]
}

export interface UpdateTargetPageLayoutPayload {
  pageName: string
  layout:
    | "default"
    | "presetA"
    | "presetB"
    | "presetC"
    | "presetD"
    | "presetE"
    | "Custom"
  originPageNode?: ComponentTreeNode
}

export interface UpdateTargetPagePropsPayload {
  pageName: string
  newProps: Partial<PageNodeProps>
  options?: Record<string, unknown>
  notUseUndoRedo?: boolean
}

export interface DeleteTargetPageSectionPayload {
  pageName: string
  deleteSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
}

export interface AddTargetPageSectionPayload {
  pageName: string
  addedSectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
  originSectionNode?: ComponentTreeNode
}

export interface AddSectionViewPayload {
  parentNodeName: string
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
  originChildrenNode?: ComponentTreeNode[]
}

export interface AddSectionViewByConfigPayload extends AddSectionViewPayload {
  sectionViewNode: ComponentTreeNode
  sectionViewConfig: SectionViewShape
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

export interface AddModalComponentPayload {
  currentPageDisplayName: string
  modalComponentNode: ComponentTreeNode
}

export interface UpdateComponentNodeHeightPayload {
  displayName: string
  height: number
  oldHeight: number
}

export interface SetGlobalStatePayload {
  key: string
  value: string
  oldKey?: string
}

export interface DeleteGlobalStatePayload {
  key: string
}

export interface DeleteSubPageViewNodePayload {
  pageName: string
  subPagePath: string
}

export interface UpdateCurrentPageStylePayload {
  pageName: string
  style: Record<string, any>
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
}

export interface DeleteCurrentPageStylePayload {
  pageName: string
  styleKey: string
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
}
