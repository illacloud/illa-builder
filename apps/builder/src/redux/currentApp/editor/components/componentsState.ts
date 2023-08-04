import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"

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
export type ViewportSizeType = "fluid" | "desktop" | "tablet" | "custom"

export interface ComponentNode {
  version: number
  displayName: string
  parentNode: string | null
  showName: string
  childrenNode: ComponentNode[]
  type: string
  containerType: CONTAINER_TYPE
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
}

export interface RootComponentNodeProps {
  currentPageIndex: number
  pageSortedKey: string[]
  homepageDisplayName?: string

  viewportWidth?: number
  viewportHeight?: number
  viewportSizeType?: ViewportSizeType
  currentSubPagePath?: string
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

export interface ModalSectionNodeProps {
  sortedKey?: string[]
  currentIndex?: number
}

export interface ModalSectionNode extends ComponentNode {
  type: "MODAL_SECTION_NODE"
  props: ModalSectionNodeProps
}

export type ComponentsState = ComponentNode | null
export const ComponentsInitialState: ComponentsState = null

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
  newChildrenNode: ComponentNode[]
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
  addedViewItem: ViewItemShape[]
  addComponent: ComponentNode
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
  childNodes: ComponentNode[]
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
  originPageNode?: ComponentNode
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
  originSectionNode?: ComponentNode
}

export interface AddSectionViewPayload {
  parentNodeName: string
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
  originChildrenNode?: ComponentNode[]
}

export interface AddSectionViewByConfigPayload extends AddSectionViewPayload {
  sectionViewNode: ComponentNode
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
  modalComponentNode: ComponentNode
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
