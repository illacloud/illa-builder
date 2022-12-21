import { RefObject } from "react"
import { IllaMode } from "@/redux/config/configState"
import {
  ComponentNode,
  PageNode,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"

export interface DragPosition {
  squareX: number
  squareY: number
  renderX: number
  renderY: number
}

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

export interface RenderComponentCanvasProps {
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  minHeight?: number
}

export interface DebounceUpdateReflow {
  parentDisplayName: string
  childNodes: ComponentNode[]
}

export interface RenderPageProps {
  pageNode: PageNode
  currentPageDisplayName: string
}

export interface RenderSectionProps {
  sectionNode: SectionNode
  mode: IllaMode
}

export interface RenderHeaderSectionProps {
  sectionNode: SectionNode
  topHeight: number
  offsetTop: number
  containerHeight: number
  mode: IllaMode
  footerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}

export interface RenderFooterSectionProps {
  sectionNode: SectionNode
  bottomHeight: number
  offsetTop: number
  containerHeight: number
  mode: IllaMode
  headerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}

export interface RenderLeftSectionProps {
  sectionNode: SectionNode
  offsetLeft: number
  containerWidth: number
  mode: IllaMode
  leftWidth: number
  rightWidth: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  showFoldIcon: boolean
  isFold: boolean
  setIsLeftFold: (isFold: boolean) => void
  canvasSize: "auto" | "fixed"
}

export interface RenderRightSectionProps {
  sectionNode: SectionNode
  offsetLeft: number
  containerWidth: number
  mode: IllaMode
  leftWidth: number
  rightWidth: number
  currentPageDisplayName: string
  rightPosition: SECTION_POSITION
  showFoldIcon: boolean
  isFold: boolean
  setIsRightFold: (isFold: boolean) => void
  canvasSize: "auto" | "fixed"
}

export interface RenderContainerProps {
  containerNode: SectionNode
}

export interface ChangeLayoutBarProps {
  sectionName: string
  direction: "top" | "bottom" | "left" | "right"
  changeAction: (
    sectionName: string,
    direction?: "top" | "bottom" | "left" | "right",
  ) => void
}
