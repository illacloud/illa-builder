import { FC, ReactNode } from "react"
import { autoHeightContainerStyle } from "@/widgetLibrary/PublicSector/autoHeightContainer/style"
import { useAutoUpdateHeight } from "@/widgetLibrary/PublicSector/utils/autoUpdateHeight"

interface AutoHeightContainerProps {
  updateComponentHeight: (height: number) => void
  children: ReactNode
}

export const AutoHeightContainer: FC<AutoHeightContainerProps> = ({
  updateComponentHeight,
  children,
}) => {
  const [containerRef] = useAutoUpdateHeight(updateComponentHeight)

  return (
    <div ref={containerRef} css={autoHeightContainerStyle}>
      {children}
    </div>
  )
}
