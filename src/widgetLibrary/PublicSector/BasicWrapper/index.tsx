import { FC } from "react"
import { BasicWrapperStyle } from "@/widgetLibrary/PublicSector/BasicWrapper/style"
import { BasicWrapperProps } from "@/widgetLibrary/PublicSector/BasicWrapper/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const BasicWrapper: FC<BasicWrapperProps> = (props) => {
  const { children, tooltipText } = props
  return (
    <TooltipWrapper
      position="tl"
      tooltipText={tooltipText}
      disabled={!tooltipText}
    >
      <div css={BasicWrapperStyle}>{children}</div>
    </TooltipWrapper>
  )
}
