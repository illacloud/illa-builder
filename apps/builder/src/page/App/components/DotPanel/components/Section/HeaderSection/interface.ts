import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { RenderBasicSectionProps } from "../interface"

export interface RenderHeaderSectionProps extends RenderBasicSectionProps {
  topHeight: number
  containerHeight: number
  footerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}
