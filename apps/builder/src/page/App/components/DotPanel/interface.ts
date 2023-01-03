import { IllaMode } from "@/redux/config/configState"
import {
  ComponentNode,
  ModalSectionNode,
  PageNode,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"

export interface DragInfo {
  item: ComponentNode
  childrenNodes: ComponentNode[]
  currentColumnNumber: number
}

// return when drop trigger
export interface DropResultInfo {
  isDropOnCanvas: boolean
}

// return when drop collect trigger
export interface DropCollectedInfo {
  isActive: boolean
  nodeWidth: number
  nodeHeight: number
}

// return when drag collect trigger
export interface DragCollectedInfo {
  isDragging: boolean
}

export interface PreviewPlaceholderProps {
  canDrop: boolean
  x: number
  y: number
  lunchX: number
  lunchY: number
  w: number
  h: number
}

export interface DebounceUpdateReflow {
  parentDisplayName: string
  childNodes: ComponentNode[]
}

export interface RenderPageProps {
  pageNode: PageNode
  currentPageDisplayName: string
}

export interface RenderBasicSectionProps {
  sectionNode: SectionNode
  mode: IllaMode
  columns?: number
}

export interface RenderModalSectionProps {
  sectionNode: ModalSectionNode
  columns?: number
  mode: IllaMode
}

export interface RenderSectionProps extends RenderBasicSectionProps {}

export interface RenderHeaderSectionProps extends RenderBasicSectionProps {
  topHeight: number
  offsetTop: number
  containerHeight: number
  footerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}

export interface RenderFooterSectionProps extends RenderBasicSectionProps {
  bottomHeight: number
  offsetTop: number
  containerHeight: number
  headerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}

export interface RenderLeftSectionProps extends RenderBasicSectionProps {
  offsetLeft: number
  containerWidth: number
  leftWidth: number
  rightWidth: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  showFoldIcon: boolean
  isFold: boolean
  setIsLeftFold: (isFold: boolean) => void
  canvasSize: "auto" | "fixed"
}

export interface RenderRightSectionProps extends RenderBasicSectionProps {
  offsetLeft: number
  containerWidth: number
  leftWidth: number
  rightWidth: number
  currentPageDisplayName: string
  rightPosition: SECTION_POSITION
  showFoldIcon: boolean
  isFold: boolean
  setIsRightFold: (isFold: boolean) => void
  canvasSize: "auto" | "fixed"
}

export interface ChangeLayoutBarProps {
  sectionName: string
  direction: "top" | "bottom" | "left" | "right"
  changeAction: (
    sectionName: string,
    direction?: "top" | "bottom" | "left" | "right",
  ) => void
}
