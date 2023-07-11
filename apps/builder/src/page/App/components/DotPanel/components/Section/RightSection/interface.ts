import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { RenderBasicSectionProps } from "../interface"

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
