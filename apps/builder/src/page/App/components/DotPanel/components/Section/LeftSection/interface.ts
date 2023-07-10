import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { RenderBasicSectionProps } from "../interface"

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
