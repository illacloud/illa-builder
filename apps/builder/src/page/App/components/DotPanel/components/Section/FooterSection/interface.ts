import { RenderBasicSectionProps } from "../interface"

export interface RenderFooterSectionProps extends RenderBasicSectionProps {
  bottomHeight: number
  containerHeight: number
  headerHeight: number
  currentPageDisplayName: string
}
