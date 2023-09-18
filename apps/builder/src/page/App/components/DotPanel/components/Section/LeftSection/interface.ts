import { RenderBasicSectionProps } from "../interface"

export interface RenderLeftSectionProps extends RenderBasicSectionProps {
  leftWidth: number
  showFoldIcon: boolean
  isFold: boolean
  setIsLeftFold: (isFold: boolean) => void
}
