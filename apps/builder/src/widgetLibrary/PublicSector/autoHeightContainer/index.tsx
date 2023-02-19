import { FC, ReactNode } from "react"
import {
  autoHeightContainerStyle,
  fixedHeightContainerStyle,
} from "@/widgetLibrary/PublicSector/autoHeightContainer/style"
import { useAutoUpdateHeight } from "@/widgetLibrary/PublicSector/utils/autoUpdateHeight"

interface AutoHeightContainerProps {
  updateComponentHeight: (height: number) => void
  enable?: boolean
  children: ReactNode
}

export const AutoHeightContainer: FC<AutoHeightContainerProps> = ({
  updateComponentHeight,
  children,
  enable = true,
}) => {
  const [containerRef] = useAutoUpdateHeight(updateComponentHeight, enable)

  return (
    <div
      ref={containerRef}
      css={enable ? autoHeightContainerStyle : fixedHeightContainerStyle}
    >
      {children}
    </div>
  )
}
