import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { RenderBasicSectionProps } from "../interface"

export interface RenderFooterSectionProps extends RenderBasicSectionProps {
  bottomHeight: number
  containerHeight: number
  headerHeight: number
  currentPageDisplayName: string
  leftPosition: SECTION_POSITION
  rightPosition: SECTION_POSITION
}
