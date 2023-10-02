import { RenderBasicSectionProps } from "../interface"

export interface RenderHeaderSectionProps extends RenderBasicSectionProps {
  topHeight: number
  containerHeight: number
  footerHeight: number
  currentPageDisplayName: string
}
