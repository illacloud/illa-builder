import {
  ComponentNode,
  PageNode,
  SectionNode,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { HTMLAttributes, RefObject } from "react"

export interface DragPosition {
  squareX: number
  squareY: number
  renderX: number
  renderY: number
}

export interface DragInfo {
  item: ComponentNode
  childrenNodes: ComponentNode[]
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
}

export interface RenderSectionProps {
  sectionNode: SectionNode
}

export interface RenderHeaderSectionProps {
  sectionNode: SectionNode
  topHeight: number
  offsetTop: number
}

export interface RenderFooterSectionProps {
  sectionNode: SectionNode
  bottomHeight: number
  offsetTop: number
  containerHeight: number
}

export interface RenderLeftSectionProps {
  sectionNode: SectionNode
  offsetLeft: number
  containerWidth: number
}

export interface RenderRightSectionProps {
  sectionNode: SectionNode
  offsetLeft: number
  containerWidth: number
}

export interface RenderContainerProps {
  containerNode: SectionNode
}
