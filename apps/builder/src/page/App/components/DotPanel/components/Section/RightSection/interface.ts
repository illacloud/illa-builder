import { RenderBasicSectionProps } from "../interface"

export interface RenderRightSectionProps extends RenderBasicSectionProps {
  rightWidth: number
  showFoldIcon: boolean
  isFold: boolean
  setIsRightFold: (isFold: boolean) => void
}
