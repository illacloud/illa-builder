import { IllaMode } from "@/redux/config/configState"
import {
  ModalSectionNode,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"

export interface ChangeLayoutBarProps {
  direction: "top" | "bottom" | "left" | "right"
  currentPosition: SECTION_POSITION
  currentPageName: string
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
  targetSectionName: "leftSection" | "rightSection"
}

export interface ChangeVerticalLayoutBarProps extends ChangeLayoutBarProps {
  direction: "top" | "bottom"
  sectionName: "leftSection" | "rightSection"
}

export interface changeHorizontalLayoutBarProps extends ChangeLayoutBarProps {
  sectionName: "headerSection" | "footerSection"
  direction: "left" | "right"
}

export interface RenderBasicSectionProps {
  sectionNode: SectionNode
  mode: IllaMode
}

export interface RenderModalSectionProps {
  sectionNode: ModalSectionNode
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
